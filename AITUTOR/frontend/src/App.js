import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './Content.jsx';
import Dashboard from './Dashboard';
import Tuition from './Tuition.jsx';
import Essay from './Essay';
import Export from './Export';
import Creation from './creation'; // Import the Creation component
import { DataProvider } from './Datacontext'; // Import the DataProvider
import Stats from './Stats.jsx';
function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Creation />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/options" element={<Tuition />} />
          <Route path="/essay" element={<Essay />} />
          <Route path="/export" element={<Export />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
