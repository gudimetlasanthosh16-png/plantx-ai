import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Result from './pages/Result';
import ErrorScreen from './pages/ErrorScreen';
import SharedReport from './pages/SharedReport';
import DemoOne from './components/ui/demo';
import { LanguageProvider } from './context/LanguageContext';

/**
 * Automatically routes root URL scans (e.g. `/?share=...` or `/?data=...`) directly to
 * SharedReport so that QR scans succeed even on static servers without SPA rewrites.
 */
function RootIndexHandler() {
  const [searchParams] = useSearchParams();
  if (searchParams.get('data') || searchParams.get('share')) {
    return <SharedReport />;
  }
  return <Home />;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-transparent relative">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<RootIndexHandler />} />
              <Route path="/scan" element={<Scanner />} />
              <Route path="/result" element={<Result />} />
              <Route path="/share" element={<SharedReport />} />
              <Route path="/error" element={<ErrorScreen />} />
              <Route path="/demo" element={<DemoOne />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
