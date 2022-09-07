
import './App.css';
import Flights from './components/Flights';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

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
