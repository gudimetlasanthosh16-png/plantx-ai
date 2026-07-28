import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import Result from './pages/Result';
import ErrorScreen from './pages/ErrorScreen';
import SharedReport from './pages/SharedReport';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scanner />} />
            <Route path="/result" element={<Result />} />
            <Route path="/share" element={<SharedReport />} />
            <Route path="/error" element={<ErrorScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
