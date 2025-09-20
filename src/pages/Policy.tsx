import React from "react";

const Policy: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl">
        {/* Heading */}
        <h2 className="text-8xl font-bold text-[#f6dfd7] mb-6 text-center custom-font">Our Policies</h2>

        {/* Shipping Policy */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Shipping Policy</h3>
          <p className="text-gray-600 leading-relaxed">
            All products are handmade with love and care. Please allow{" "}
            <span className="font-medium">3–7 business days</span> for processing
            and shipping. Delivery times may vary depending on your location.
          </p>
        </div>

        {/* Return Policy */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Return & Exchange</h3>
          <p className="text-gray-600 leading-relaxed">
            Since our products are handmade, we currently{" "}
            <span className="font-medium">do not accept returns</span> unless the
            item arrives damaged or defective. Please contact us within{" "}
            <span className="font-medium">48 hours</span> of receiving your order
            if you face any issues.
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Policy</h3>
          <p className="text-gray-600 leading-relaxed">
            We respect your privacy. Any personal details shared with us (such
            as email, phone, or address) are used only to fulfill your order and
            provide better service. Your information will{" "}
            <span className="font-medium">never be shared</span> with third parties.
          </p>
        </div>

        {/* Closing Note */}
        <p className="text-center text-gray-600 mt-8">
          Thank you for trusting <span className="font-semibold">ZJ Crafts Hub</span>.  
          We’re happy to have you as part of our handmade journey 💖
        </p>
      </div>
    </div>
  );
};

export default Policy;
