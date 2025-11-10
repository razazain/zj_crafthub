import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/images/logo-favicon.png";
import { API_URL } from "../config";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle newsletter subscription
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.message || "Subscription failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#f6dfd7] text-gray-700">
      <Toaster position="top-center" />
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center text-center">
          <img
            src={logo}
            alt="zj crafts hub"
            style={{ width: "80px", height: "80px" }}
            className="mb-2"
          />
          <div className="flex items-baseline space-x-2">
            <h1 className="text-xl font-bold text-gray-600 font-serif">ZJ</h1>
            <span className="text-2xl text-gray-500 custom-font">Crafts hub</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium mb-8">
          <Link to="/aboutus" className="hover:text-black">
            ABOUT US
          </Link>
          <Link to="/contact" className="hover:text-black">
            CONTACT
          </Link>
          <Link to="/policy" className="hover:text-black">
            POLICY
          </Link>
          <Link to="/faqs" className="hover:text-black">
            FAQS
          </Link>
        </nav>

        {/* Newsletter */}
        <form
          onSubmit={handleSubscribe}
          className="flex justify-center items-center max-w-md mx-auto mb-8"
        >
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-3 rounded-r-full text-sm font-semibold transition-colors ${
              loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#d0a19b] text-white hover:bg-[#c58f87]"
            }`}
          >
            {loading ? "Subscribing..." : "SUBSCRIBE"}
          </button>
        </form>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6 text-gray-600">
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        {/* Bottom Info */}
        <div className="text-sm text-gray-500">
          MADE BY LOVE |
          <a
            href="https://wa.me/923003123154"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-700 hover:text-[#d0a19b] transition-colors duration-300"
          >
            {" "}
            (+92) 300 3123154{" "}
          </a>
          |
        </div>
      </div>
    </footer>
  );
};

export default Footer;
