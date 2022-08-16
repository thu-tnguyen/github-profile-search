import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      {/** All routes on the platform */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* all other pages redirect to default page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
