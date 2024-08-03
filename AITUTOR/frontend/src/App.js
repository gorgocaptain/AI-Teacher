import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Content from './Content.jsx';
import Dashboard from './Dashboard';
import Options from './Options';
import Essay from './Essay';
import Export from './Export';
import Creation from './creation'; // Import the Creation component
import { DataProvider } from './Datacontext'; // Import the DataProvider

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Creation />} /> 
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/options" element={<Options />} />
          <Route path="/essay" element={<Essay />} />
          <Route path="/export" element={<Export />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
