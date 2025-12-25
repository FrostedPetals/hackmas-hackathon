import React from 'react';
import Navbar from '../components/home/Navbar.jsx';
import SnowScene from './SnowScene.jsx';
import Hero from '../components/home/Hero.jsx';
import Footer from '../components/home/Footer.jsx';

function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen">

        <Navbar />
        <SnowScene />

        <div className="flex-1">
          <Hero />
        </div>

        <Footer />
      </div>
    </>

  );
}

export default Home;