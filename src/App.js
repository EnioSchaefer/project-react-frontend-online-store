import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SideBar from './components/SideBar';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={ Home } />
      <SideBar />
    </BrowserRouter>
  );
}

export default App;
