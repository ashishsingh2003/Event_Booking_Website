import React, { useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom';

import Home from './Pages/Home';
import Addevent from './Pages/Addevent';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Navbar from './Components/Navbar';
import Show from './Pages/Show';
import Edit from './Pages/Edit';
import axios from 'axios';
import Footer from './Pages/Footer';
import Success from './Pages/Success';
import Cancel from './Pages/Cancel';
import styles from './App.module.css';
function App() {
  
  return (
    <div>
      <div><Navbar/></div>
       <div className={styles.plain}>
      <div>
   
      
     
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/addevent" element={<Addevent/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/Show/:id" element={<Show/>}></Route>
        <Route path="/edit/:id" element={<Edit/>}></Route>
        <Route path="/success/:id" element={<Success/>}/>
        <Route path="/cancel" element={<Cancel/>}/>
      </Routes>
      </div>
 
    </div>
     <div><Footer/></div>
    </div>
  )
}

export default App
