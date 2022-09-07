import logo from './logo.svg';
import './App.css';
import Flights from './components/Flights';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { w3cwebsocket } from 'websocket';

function App() {
  return (
    <BrowserRouter>,
    <Routes>
      <Route index element={<Flights/>} />
    </Routes>,
    </BrowserRouter>
    
  );
}
  
export default App
