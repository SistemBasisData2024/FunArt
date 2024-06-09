// src/App.jsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContentList from './components/ContentList';
import Login from './pages/Login';
import AuthProvider from './contexts/AuthContexts';
import ContentDetail from './pages/ContentDetail'; 
import ImageViewer from './components/ImageViewer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<ContentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/content/:id/view" element={<ImageViewer />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
