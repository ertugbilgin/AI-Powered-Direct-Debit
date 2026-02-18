import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import B2CMobile from './pages/B2CMobile';
import B2CWeb from './pages/B2CWeb';
import B2BHub from './pages/B2BHub';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/b2c-mobile" element={<B2CMobile />} />
        <Route path="/b2c-web" element={<B2CWeb />} />
        <Route path="/b2b-hub" element={<B2BHub />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
