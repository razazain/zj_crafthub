import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        {/* Heading */}
        <h2 className="text-8xl font-bold text-[#f6dfd7] mb-6 custom-font">About Us</h2>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-4">
          Welcome to <span className="font-semibold text-gray-800">ZJ Crafts Hub</span>!  
          This little shop is run with love and creativity by a girl who is
          passionate about making handmade, cute, and unique things.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          From colorful <span className="font-medium">bracelets</span> to
          personalized <span className="font-medium">keychains</span>, and
          delicate <span className="font-medium">bead accessories</span>, each
          piece is carefully crafted to bring joy, charm, and a touch of
          uniqueness to your everyday life.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">
          At ZJ Crafts Hub, it’s not just about products — it’s about spreading
          positivity and making people smile through little handmade treasures.
        </p>

        {/* Closing Note */}
        <h3 className="text-xl font-semibold text-gray-700">
          Thank you for supporting handmade creations 💖
        </h3>
      </div>
    </div>
  );
};

export default AboutUs;
