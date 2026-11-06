import { Route, Routes, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import ReadingList from './pages/ReadingList';
import ReadingTest from './pages/ReadingTest';
import ListeningList from './pages/ListeningList';
import ListeningTest from './pages/ListeningTest';
import WritingList from './pages/WritingList';
import WritingTask from './pages/WritingTask';
import SpeakingHome from './pages/SpeakingHome';
import SpeakingPart1 from './pages/SpeakingPart1';
import SpeakingCard from './pages/SpeakingCard';
import SpeakingMock from './pages/SpeakingMock';
import Vocabulary from './pages/Vocabulary';
import GrammarList from './pages/GrammarList';
import GrammarLesson from './pages/GrammarLesson';
import GuidesList from './pages/GuidesList';
import GuidePage from './pages/GuidePage';
import MockTest from './pages/MockTest';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import Descriptors from './pages/Descriptors';
import AiChat from './pages/AiChat';

function NotFound() {
  return (
    <div className="card p-10 text-center">
      <h1 className="h1">Page not found</h1>
      <Link to="/" className="btn-primary mt-4">
        Back to today
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/start" element={<Onboarding />} />
        <Route path="/reading" element={<ReadingList />} />
        <Route path="/reading/:id" element={<ReadingTest />} />
        <Route path="/listening" element={<ListeningList />} />
        <Route path="/listening/:id" element={<ListeningTest />} />
        <Route path="/writing" element={<WritingList />} />
        <Route path="/writing/:id" element={<WritingTask />} />
        <Route path="/speaking" element={<SpeakingHome />} />
        <Route path="/speaking/part1/:id" element={<SpeakingPart1 />} />
        <Route path="/speaking/card/:id" element={<SpeakingCard />} />
        <Route path="/speaking/mock" element={<SpeakingMock />} />
        <Route path="/vocabulary" element={<Vocabulary />} />
        <Route path="/grammar" element={<GrammarList />} />
        <Route path="/grammar/:id" element={<GrammarLesson />} />
        <Route path="/guides" element={<GuidesList />} />
        <Route path="/guides/:id" element={<GuidePage />} />
        <Route path="/mock" element={<MockTest />} />
        <Route path="/chat" element={<AiChat />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/descriptors" element={<Descriptors />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
