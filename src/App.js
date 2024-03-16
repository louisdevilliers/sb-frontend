import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Homepage from './pages/Homepage';
import EntityShowPage from './pages/Showpage';
import EntityAddPage from './pages/Addpage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Sidebar />
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/:entity/show" element={<EntityShowPage />} />
            <Route path="/:entity/add" element={<EntityAddPage />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
