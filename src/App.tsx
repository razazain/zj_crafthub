import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import Policy from './pages/Policy';
import Faqs from './pages/Faqs';
import Profile from './pages/Profile';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />


          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/faqs" element={<Faqs />} />

        </Routes>

        <Footer />  

      </div>
    </Router>
  );
}

export default App;

              