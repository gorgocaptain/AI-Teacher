import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Creation from './creation';
import Dashboard from './Dashboard';
import Options from './Options.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Creation />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Router>
  );
}

export default App;
