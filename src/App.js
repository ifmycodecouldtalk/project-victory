import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Home } from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends React.Component {
  render(){
    return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
    )
  }
}

export default App;