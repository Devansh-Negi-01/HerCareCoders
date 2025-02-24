import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  // const id = useSelector(state=>state.auth.userId);
  // console.log(id);
  
  return (
    <div className=''>
      <Header />
      <Outlet/>
      <Footer />
    </div>
  )
}

export default App
