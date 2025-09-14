import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './docs/Home';
import TypingEffectGuide from './docs/TypingEffectGuide';
import FetchStreamGuide from './docs/FetchStreamGuide';
import LLMGuide from './docs/LLMGuide';
import TTSGuide from './docs/TTSGuide';
import Layout from './components/Layout';
import './i18n';

export default function App() {
  return (
    <Router basename="/tool/llm-hooks">
      <Layout>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/typing-effect" element={<TypingEffectGuide />} />
          <Route path="/fetch-stream" element={<FetchStreamGuide />} />
          <Route path="/llm" element={<LLMGuide />} />
          <Route path="/tts" element={<TTSGuide />} />
        </Routes>
      </Layout>
    </Router>
  );
}