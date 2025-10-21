import { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpeg";
import { Menu, X, User, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // ✅ Fetch Wishlist Count
  const fetchWishlistCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setWishlistCount(data.count || 0);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // ✅ Fetch Cart Count
  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setCartCount(data.cart?.count || data.cart?.items?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // ✅ Fetch counts on component mount
  useEffect(() => {
    fetchWishlistCount();
    fetchCartCount();
  }, []);

  return (
    <>
      {/* Main Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100 relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-2">
              <div className="text-green-600">
                <img
                  src={logo}
                  alt="zj crafts hub"
                  style={{ width: "80px", height: "80px" }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-600 font-serif">ZJ</h1>
                <span className="text-2xl text-gray-500 -mt-1 custom-font">
                  Crafts hub
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="group relative font-serif text-gray-900 font-medium transition-colors duration-300 hover:text-[#d0a19b]"
              >
                HOME
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d0a19b] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/shop"
                className="group relative font-serif text-gray-900 font-medium transition-colors duration-300 hover:text-[#d0a19b]"
              >
                SHOP
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d0a19b] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/contact"
                className="group relative font-serif text-gray-900 font-medium transition-colors duration-300 hover:text-[#d0a19b]"
              >
                CONTACT US
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d0a19b] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* ✅ Right Side Icons */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/profile" className="relative group">
                <User className="w-6 h-6 text-gray-700 hover:text-[#d0a19b] transition-colors" />
              </Link>

              {/* ❤️ Wishlist */}
              <Link to="/wishlist" className="relative group">
                <Heart className="w-6 h-6 text-gray-700 hover:text-[#d0a19b] transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d0a19b] text-white text-xs font-semibold rounded-full px-1.5">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* 🛒 Cart */}
              <Link to="/cart" className="relative group">
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#d0a19b] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d0a19b] text-white text-xs font-semibold rounded-full px-1.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleDrawer} className="text-gray-800">
                {isDrawerOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Mobile Navigation */}
        {isDrawerOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-100 absolute w-full left-0 top-full z-40">
            <nav className="flex flex-col items-start px-4 py-4 space-y-4">
              <Link
                to="/"
                onClick={() => setIsDrawerOpen(false)}
                className="font-serif text-gray-900 font-medium hover:text-[#d0a19b]"
              >
                HOME
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsDrawerOpen(false)}
                className="font-serif text-gray-900 font-medium hover:text-[#d0a19b]"
              >
                SHOP
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsDrawerOpen(false)}
                className="font-serif text-gray-900 font-medium hover:text-[#d0a19b]"
              >
                CONTACT US
              </Link>

              {/* ✅ Icons in Mobile Menu */}
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 w-full">
                <Link to="/profile" onClick={() => setIsDrawerOpen(false)}>
                  <User className="w-6 h-6 text-gray-700 hover:text-[#d0a19b] transition-colors" />
                </Link>
                <Link to="/wishlist" onClick={() => setIsDrawerOpen(false)}>
                  <Heart className="w-6 h-6 text-gray-700 hover:text-[#d0a19b] transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#d0a19b] text-white text-xs font-semibold rounded-full px-1.5">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/cart" onClick={() => setIsDrawerOpen(false)}>
                  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#d0a19b] transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#d0a19b] text-white text-xs font-semibold rounded-full px-1.5">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
