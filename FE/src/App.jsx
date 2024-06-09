// src/App.jsx
// import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ContentList from './components/ContentList.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './contexts/AuthContexts.jsx';
import ContentDetail from './pages/ContentDetail.jsx'; 
import ImageViewer from './components/ImageViewer.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<ContentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/content/:id" element={<ContentDetail />} />
          <Route path="/content/:id/view" element={<ImageViewer />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
