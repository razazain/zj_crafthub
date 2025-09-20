import React from 'react'
import Hero from '../components/Hero';
import PromotionalStrips from '../components/PromotionalStrips';
import BestSellers from '../components/BestSellers';
// import Footer from '../components/Footer';


const Home: React.FC = () => {
  return (
    <div>
        <Hero />
        <PromotionalStrips />
        <BestSellers />
        {/* <Footer /> */}
    </div>
  )
}

export default Home