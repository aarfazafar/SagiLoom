
import './App.css'
import Lenis from 'lenis'
import Home from './Components/Home/Home'
import NavBar from './Components/NavBar/NavBar'
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  return (
   <div className='w-screen'>
    {/* <NavBar/> */}
    <Home/>
   </div>
  )
}

export default App
