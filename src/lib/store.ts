import { useSyncExternalStore } from 'react';
import type { Module, QuestionType, Skill } from '../content/types';

export type AttemptKind = Skill | 'mock' | 'diagnostic' | 'grammar';

export interface Attempt {
  id: string;
  kind: AttemptKind;
  itemId: string;
  title: string;
  date: string; // ISO
  score?: number;
  total?: number;
  band?: number;
  /** for mock tests: per-skill bands */
  bands?: Partial<Record<Skill, number>>;
  byType?: Partial<Record<QuestionType, { correct: number; total: number }>>;
  minutes?: number;
}

export interface WritingSubmission {
  id: string;
  taskId: string;
  text: string;
  date: string;
  wordCount: number;
  minutes: number;
  /** self or AI assessed criteria */
  criteria?: { tr: number; cc: number; lr: number; gra: number };
  band?: number;
  source?: 'self' | 'ai' | 'auto';
  feedback?: string;
}

export interface SpeakingSubmission {
  id: string;
  itemId: string;
  part: 1 | 2 | 3;
  date: string;
  transcript: string;
  seconds: number;
  criteria?: { fc: number; lr: number; gra: number; p: number };
  band?: number;
  source?: 'self' | 'ai';
  feedback?: string;
}

export interface Profile {
  name: string;
  module: Module;
  targetBand: number;
  examDate: string; // yyyy-mm-dd
  hoursPerDay: number;
  startBands: Record<Skill, number>;
  createdAt: string;
}

export interface SrsCard {
  ease: number;
  interval: number; // days
  reps: number;
  due: string; // yyyy-mm-dd
  lapses: number;
}

export interface ErrorLogEntry {
  id: string;
  date: string;
  skill: Skill | 'grammar' | 'vocabulary';
  source: string;
  note: string;
}

export interface Settings {
  apiKey: string;
  speechRate: number;
  theme: 'system' | 'light' | 'dark';
}

export interface AppState {
  version: 1;
  profile: Profile | null;
  attempts: Attempt[];
  writing: WritingSubmission[];
  speaking: SpeakingSubmission[];
  srs: Record<string, SrsCard>;
  /** yyyy-mm-dd -> completed plan task ids */
  planDone: Record<string, string[]>;
  /** yyyy-mm-dd days with any study activity */
  activeDays: string[];
  errorLog: ErrorLogEntry[];
  readGuides: string[];
  settings: Settings;
  /** when the profile was last edited (for cross-device merge) */
  profileUpdatedAt?: string;
  /** ids of deleted error-log entries (tombstones, so sync does not resurrect them) */
  deletedIds?: string[];
}

const KEY = 'ielts-master:v1';

export const emptyState = (): AppState => ({
  version: 1,
  profile: null,
  attempts: [],
  writing: [],
  speaking: [],
  srs: {},
  planDone: {},
  activeDays: [],
  errorLog: [],
  readGuides: [],
  settings: { apiKey: '', speechRate: 0.95, theme: 'system' },
});

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    return { ...emptyState(), ...parsed, settings: { ...emptyState().settings, ...(parsed.settings ?? {}) } };
  } catch {
    return emptyState();
  }
}

let state: AppState = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — keep in memory */
  }
}

export function getState(): AppState {
  return state;
}

export function setState(updater: (s: AppState) => AppState) {
  state = updater(state);
  persist();
  listeners.forEach((l) => l());
}

export function resetState(next: AppState = emptyState()) {
  state = next;
  persist();
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useStore<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(state));
}

export const today = (d = new Date()) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

/* ---------------- actions ---------------- */

function markActive(s: AppState): AppState {
  const t = today();
  return s.activeDays.includes(t) ? s : { ...s, activeDays: [...s.activeDays, t] };
}

export function saveProfile(p: Profile) {
  setState((s) => ({ ...s, profile: p, profileUpdatedAt: new Date().toISOString() }));
}

export function addAttempt(a: Omit<Attempt, 'id' | 'date'>) {
  const full: Attempt = { ...a, id: uid(), date: new Date().toISOString() };
  setState((s) => markActive({ ...s, attempts: [...s.attempts, full] }));
  return full;
}

export function addWriting(w: Omit<WritingSubmission, 'id' | 'date'>) {
  const full: WritingSubmission = { ...w, id: uid(), date: new Date().toISOString() };
  setState((s) => markActive({ ...s, writing: [...s.writing, full] }));
  return full;
}

export function updateWriting(id: string, patch: Partial<WritingSubmission>) {
  setState((s) => ({ ...s, writing: s.writing.map((w) => (w.id === id ? { ...w, ...patch } : w)) }));
}

export function addSpeaking(sp: Omit<SpeakingSubmission, 'id' | 'date'>) {
  const full: SpeakingSubmission = { ...sp, id: uid(), date: new Date().toISOString() };
  setState((s) => markActive({ ...s, speaking: [...s.speaking, full] }));
  return full;
}

export function updateSpeaking(id: string, patch: Partial<SpeakingSubmission>) {
  setState((s) => ({ ...s, speaking: s.speaking.map((w) => (w.id === id ? { ...w, ...patch } : w)) }));
}

export function togglePlanTask(day: string, taskId: string) {
  setState((s) => {
    const done = s.planDone[day] ?? [];
    const next = done.includes(taskId) ? done.filter((d) => d !== taskId) : [...done, taskId];
    return markActive({ ...s, planDone: { ...s.planDone, [day]: next } });
  });
}

export function addError(e: Omit<ErrorLogEntry, 'id' | 'date'>) {
  setState((s) => ({ ...s, errorLog: [{ ...e, id: uid(), date: new Date().toISOString() }, ...s.errorLog] }));
}

export function removeError(id: string) {
  setState((s) => ({ ...s, errorLog: s.errorLog.filter((e) => e.id !== id), deletedIds: [...(s.deletedIds ?? []), id] }));
}

export function markGuideRead(id: string) {
  setState((s) => (s.readGuides.includes(id) ? s : markActive({ ...s, readGuides: [...s.readGuides, id] })));
}

export function updateSettings(p: Partial<Settings>) {
  setState((s) => ({ ...s, settings: { ...s.settings, ...p } }));
}

export function setSrsCard(key: string, card: SrsCard) {
  setState((s) => markActive({ ...s, srs: { ...s.srs, [key]: card } }));
}

export function exportData(): string {
  return JSON.stringify(state, null, 2);
}

export function importData(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as AppState;
    if (parsed.version !== 1 || !Array.isArray(parsed.attempts)) return false;
    resetState({ ...emptyState(), ...parsed });
    return true;
  } catch {
    return false;
  }
}

export function streak(activeDays: string[], now = new Date()): number {
  const set = new Set(activeDays);
  let n = 0;
  const d = new Date(now);
  if (!set.has(today(d))) d.setDate(d.getDate() - 1); // today not yet active: count up to yesterday
  while (set.has(today(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
