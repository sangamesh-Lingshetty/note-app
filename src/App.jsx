import React from 'react'
import Container from './Components/Container';
import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Container />}></Route>
            <Route path='/write' element={<Container />}></Route>
          </Routes>
        </Router>
      </div>
      <ToastContainer autoClose={2000} />
    </>
  )
}

export default App