import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Home from './components/Home';
import './App.css';
import NavBar from './components/NavBar';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <Router>
      <TransactionProvider>
        <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </TransactionProvider>
    </Router>
  );
}

export default App;