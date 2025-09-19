import Header from './components/Header';
import Hero from './components/Hero';
import PromotionalStrips from './components/PromotionalStrips';
// import CategoryHighlights from './components/CategoryHighlights';
import BestSellers from './components/BestSellers';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <PromotionalStrips />
      {/* <CategoryHighlights /> */}
      <BestSellers /> 
      <Footer />
    </div>
  );
}

export default App;