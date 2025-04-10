import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import RetrievePage from './components/retrieveurl/RetrievePage';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>URL Shortener</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/retrieve" element={<RetrievePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
