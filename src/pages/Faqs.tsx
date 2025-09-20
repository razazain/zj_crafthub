import React from "react";

const Faqs: React.FC = () => {
  return (
    <div className="bg-white flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full">
        {/* Heading */}
        <h2 className="text-8xl font-bold text-[#f6dfd7] mb-6 text-center custom-font">Frequently Asked Questions</h2>

        {/* FAQ List */}
        <div className="space-y-6">
          {/* Q1 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              1. What kind of products do you sell?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We sell handmade cute items like bracelets, keychains, bead crafts, and other small accessories — all made with love.
            </p>
          </div>

          {/* Q2 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              2. How long does shipping take?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Orders are usually processed within <span className="font-medium">3–7 business days</span>. Delivery time may vary depending on your location.
            </p>
          </div>

          {/* Q3 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              3. Do you accept returns?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Since all products are handmade, returns are only accepted if an item arrives damaged or defective. Please contact us within 48 hours.
            </p>
          </div>

          {/* Q4 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              4. Can I request a custom design?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Yes! We love making personalized items. Reach out via our Contact page to discuss your custom order.
            </p>
          </div>

          {/* Q5 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              5. How can I contact you?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              You can use the Contact page on our website or email us at{" "}
              <a href="mailto:contact@zjcraftshub.com" className="text-[#d0a19b] font-medium hover:underline">
                contact@zjcraftshub.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
