import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg p-8">
        {/* Heading */}
        <h2 className="text-8xl font-bold text-[#d0a19b] text-center mb-6 custom-font">
          Contact Us
        </h2>

        {/* Form */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0a19b] text-gray-700"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0a19b] text-gray-700"
            />
          </div>

          {/* Phpone number */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="number"
              placeholder="Enter your PHone Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0a19b] text-gray-700"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              rows={4}
              placeholder="Write your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0a19b] text-gray-700"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#f6dfd7] text-gray-800 py-2 rounded-lg  border-2 border-transparent font-semibold hover:border-[#d0a19b] "
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
