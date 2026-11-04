import type { Task1Visual } from '../content/types';

const PALETTE = ['#4f46e5', '#0ea5e9', '#f59e0b', '#10b981', '#e11d48', '#8b5cf6', '#64748b', '#14b8a6'];

function niceMax(v: number) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * p;
}

function Legend({ names }: { names: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
      {names.map((n, i) => (
        <span key={n} className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: PALETTE[i % PALETTE.length] }} />
          {n}
        </span>
      ))}
    </div>
  );
}

function XYChart({ v }: { v: Extract<Task1Visual, { kind: 'line' | 'bar' }> }) {
  const W = 640;
  const H = 320;
  const pad = { l: 56, r: 16, t: 16, b: 48 };
  const all = v.series.flatMap((s) => s.values);
  const max = niceMax(Math.max(...all) * 1.05);
  const cw = W - pad.l - pad.r;
  const ch = H - pad.t - pad.b;
  const n = v.categories.length;
  const x = (i: number) => pad.l + (v.kind === 'line' ? (n === 1 ? cw / 2 : (i * cw) / (n - 1)) : ((i + 0.5) * cw) / n);
  const y = (val: number) => pad.t + ch - (val / max) * ch;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * max);
  const groupW = cw / n;
  const barW = Math.min(36, (groupW * 0.75) / v.series.length);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={v.title}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="stroke-slate-200 dark:stroke-slate-700" />
            <text x={pad.l - 6} y={y(t) + 4} textAnchor="end" className="fill-slate-500 text-[11px]">
              {Number.isInteger(t) ? t : t.toFixed(1)}
            </text>
          </g>
        ))}
        {v.categories.map((c, i) => (
          <text key={c} x={x(i)} y={H - pad.b + 18} textAnchor="middle" className="fill-slate-600 text-[11px] dark:fill-slate-300">
            {c}
          </text>
        ))}
        <text x={14} y={pad.t + ch / 2} transform={`rotate(-90 14 ${pad.t + ch / 2})`} textAnchor="middle" className="fill-slate-500 text-[11px]">
          {v.yLabel}
        </text>
        <text x={pad.l + cw / 2} y={H - 6} textAnchor="middle" className="fill-slate-500 text-[11px]">
          {v.xLabel}
        </text>
        {v.kind === 'line'
          ? v.series.map((s, si) => (
              <g key={s.name}>
                <polyline fill="none" stroke={PALETTE[si % PALETTE.length]} strokeWidth={2.5} points={s.values.map((val, i) => `${x(i)},${y(val)}`).join(' ')} />
                {s.values.map((val, i) => (
                  <circle key={i} cx={x(i)} cy={y(val)} r={3.5} fill={PALETTE[si % PALETTE.length]}>
                    <title>{`${s.name}, ${v.categories[i]}: ${val}`}</title>
                  </circle>
                ))}
              </g>
            ))
          : v.series.map((s, si) =>
              s.values.map((val, i) => {
                const gx = pad.l + i * groupW + (groupW - barW * v.series.length) / 2 + si * barW;
                return (
                  <rect key={`${si}-${i}`} x={gx} y={y(val)} width={barW - 2} height={pad.t + ch - y(val)} fill={PALETTE[si % PALETTE.length]} rx={2}>
                    <title>{`${s.name}, ${v.categories[i]}: ${val}`}</title>
                  </rect>
                );
              }),
            )}
      </svg>
      {v.series.length > 1 && <Legend names={v.series.map((s) => s.name)} />}
    </div>
  );
}

function Pie({ slices, label }: { slices: { name: string; value: number }[]; label: string }) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  let acc = 0;
  const R = 80;
  return (
    <figure className="flex flex-col items-center">
      <svg viewBox="-100 -100 200 200" className="w-48" role="img" aria-label={label}>
        {slices.map((s, i) => {
          const a0 = (acc / total) * Math.PI * 2 - Math.PI / 2;
          acc += s.value;
          const a1 = (acc / total) * Math.PI * 2 - Math.PI / 2;
          const large = a1 - a0 > Math.PI ? 1 : 0;
          const mid = (a0 + a1) / 2;
          const d = slices.length === 1 ? `M ${-R} 0 A ${R} ${R} 0 1 1 ${R} 0 A ${R} ${R} 0 1 1 ${-R} 0` : `M 0 0 L ${R * Math.cos(a0)} ${R * Math.sin(a0)} A ${R} ${R} 0 ${large} 1 ${R * Math.cos(a1)} ${R * Math.sin(a1)} Z`;
          return (
            <g key={s.name}>
              <path d={d} fill={PALETTE[i % PALETTE.length]} stroke="white" strokeWidth={1}>
                <title>{`${s.name}: ${s.value}%`}</title>
              </path>
              {s.value / total > 0.05 && (
                <text x={R * 0.62 * Math.cos(mid)} y={R * 0.62 * Math.sin(mid) + 4} textAnchor="middle" className="fill-white text-[11px] font-semibold">
                  {s.value}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-1 text-sm font-semibold">{label}</figcaption>
    </figure>
  );
}

export function VisualView({ visual }: { visual: Task1Visual }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
      <div className="mb-3 text-center text-sm font-semibold">{visual.title}</div>
      {(visual.kind === 'line' || visual.kind === 'bar') && <XYChart v={visual} />}
      {visual.kind === 'pie' && (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {visual.charts.map((c) => (
              <Pie key={c.label} slices={c.slices} label={c.label} />
            ))}
          </div>
          <Legend names={[...new Set(visual.charts.flatMap((c) => c.slices.map((s) => s.name)))]} />
        </>
      )}
      {visual.kind === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {visual.headers.map((h) => (
                  <th key={h} className="border border-slate-300 bg-slate-100 px-3 py-2 text-left font-semibold dark:border-slate-700 dark:bg-slate-800">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visual.rows.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className={`border border-slate-300 px-3 py-2 dark:border-slate-700 ${j === 0 ? 'font-medium' : 'text-right tabular-nums'}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {visual.kind === 'process' && (
        <ol className="flex flex-wrap items-stretch justify-center gap-2">
          {visual.steps.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <div className="w-40 rounded-xl border-2 border-brand-300 bg-brand-50 p-3 text-center text-xs dark:border-brand-700 dark:bg-brand-900/30">
                <div className="mb-1 text-[10px] font-bold text-brand-600 dark:text-brand-300">STAGE {i + 1}</div>
                {s}
              </div>
              {i < visual.steps.length - 1 && <span className="text-xl text-brand-400" aria-hidden>→</span>}
            </li>
          ))}
        </ol>
      )}
      {visual.kind === 'map' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {[visual.before, visual.after].map((m) => (
            <div key={m.label} className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50/60 p-4 dark:border-emerald-800 dark:bg-emerald-950/30">
              <div className="mb-2 text-center font-semibold">{m.label}</div>
              <ul className="space-y-1 text-sm">
                {m.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden>📍</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Plain-text description of the data, used for AI grading accuracy checks. */
export function describeVisual(v: Task1Visual): string {
  switch (v.kind) {
    case 'line':
    case 'bar':
      return `${v.kind} chart "${v.title}" (x: ${v.xLabel}, y: ${v.yLabel})\nCategories: ${v.categories.join(', ')}\n${v.series.map((s) => `${s.name}: ${s.values.join(', ')}`).join('\n')}`;
    case 'pie':
      return `Pie charts "${v.title}"\n${v.charts.map((c) => `${c.label}: ${c.slices.map((s) => `${s.name} ${s.value}%`).join(', ')}`).join('\n')}`;
    case 'table':
      return `Table "${v.title}"\n${v.headers.join(' | ')}\n${v.rows.map((r) => r.join(' | ')).join('\n')}`;
    case 'process':
      return `Process "${v.title}"\n${v.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    case 'map':
      return `Maps "${v.title}"\n${v.before.label}: ${v.before.features.join('; ')}\n${v.after.label}: ${v.after.features.join('; ')}`;
  }
}
