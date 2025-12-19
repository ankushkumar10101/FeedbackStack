import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import FeedbackForm from './pages/FeedbackForm';
import AdminLogin from './pages/AdminLogin';
import FeedbackList from './pages/FeedbackList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FeedbackForm />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<FeedbackList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
