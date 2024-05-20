import React from 'react';
import './App.css';
import SideBar from './Components/SideBar/SideBar';
import ContactPage from './Components/Contact/ContactPage';
import Create from './Components/Contact/Create';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Update from './Components/Contact/Update';
import ChartsAndMaps from './Components/Charts/ChartsAndMaps';


function App() {
  return (
    <div>
      <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path='/' element={<ContactPage/>} />
        <Route path='/create' element={<Create />}/>
        <Route path='/edit/:id' element={<Update />}/>
        <Route path='/chartsmaps' element={<ChartsAndMaps />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
