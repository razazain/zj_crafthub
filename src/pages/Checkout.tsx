import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, UploadCloud } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../config";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cart, subtotal, deliveryCharge, total } = location.state || {};
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const token = localStorage.getItem("token");

  if (!cart) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600 text-lg">No checkout data found.</p>
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-5 py-2 rounded-full hover:scale-105 transition-transform"
        >
          Go to Cart
        </button>
      </div>
    );
  }

  // ✅ Handle form field changes for shipping address
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    if (!paymentImage) {
      toast.error("Please upload your payment screenshot before placing order.");
      return;
    }

    // ✅ Validate shipping fields before submission
    const requiredFields = [
      "fullName",
      "phoneNumber",
      "email",
      "addressLine",
      "city",
      "postalCode",
      "country",
    ];
    const missing = requiredFields.filter((f) => !shipping[f as keyof typeof shipping]);
    if (missing.length > 0) {
      toast.error("Please fill out all required shipping fields.");
      return;
    }

    if (!token) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append(
        "products",
        JSON.stringify(
          cart.map((item: any) => ({
            product: item.product._id,
            quantity: item.quantity,
          }))
        )
      );
      formData.append("subtotal", subtotal.toString());
      formData.append("deliveryCharges", deliveryCharge.toString());
      formData.append("total", total.toString());
      formData.append("paymentScreenshot", paymentImage);

      // ✅ Add shipping fields
      Object.entries(shipping).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order placed successfully! 🛍️");
        navigate("/thank-you", { state: { order: data.order } });
      } else {
        toast.error(data.message || "Failed to place order ❌");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error("Something went wrong while placing order ❌");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-8xl font-bold text-center text-[#d0a19b] mb-10 custom-font">
          Checkout
        </h2>

        {/* 🧭 Step Indicator */}
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          {["Review Order", "Shipping Address", "Send Payment", "Upload Proof"].map(
            (label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${
                    step === index + 1 ? "bg-[#d0a19b]" : "bg-gray-300"
                  }`}
                >
                  {index + 1}
                </div>
                <span
                  className={`ml-2 mr-4 text-sm ${
                    step === index + 1 ? "text-[#d0a19b]" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            )
          )}
        </div>

        {/* 🧾 Step 1: Review Order */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-5">
            {cart.map((item: any, i: number) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center border-b border-gray-100 pb-4 last:border-b-0"
              >
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-xl mb-4 md:mb-0"
                />
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h3 className="font-semibold text-gray-800">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="text-[#d0a19b] font-semibold text-lg mt-2 md:mt-0">
                  Rs. {item.product.price * item.quantity}
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* 📦 Step 2: Shipping Address */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Shipping Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "fullName", label: "Full Name" },
                { name: "phoneNumber", label: "Phone Number" },
                { name: "email", label: "Email" },
                { name: "addressLine", label: "Address" },
                { name: "city", label: "City" },
                { name: "state", label: "State (optional)" },
                { name: "postalCode", label: "Postal Code" },
                { name: "country", label: "Country" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-gray-700 mb-1 text-sm font-medium">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={shipping[field.name as keyof typeof shipping]}
                    onChange={handleShippingChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#d0a19b] outline-none"
                    required={
                      !["state"].includes(field.name) // optional only for 'state'
                    }
                  />
                </div>
              ))}  
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* 💳 Step 3: Payment Instructions */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Send Your Payment
            </h3>
            <p className="text-gray-600">
              Please transfer the total amount to our Easypaisa account before proceeding.
            </p>
            <div className="bg-pink-50 rounded-xl p-4 inline-block mt-3">
              <p className="text-gray-800 font-semibold text-lg">Easypaisa Number:</p>
              <p className="text-[#d0938b] font-bold text-2xl">0345-1234567</p>
              <p className="text-gray-600 mt-1 text-sm">Account Name: ZJ Crafthub</p>
            </div>

            <div className="flex justify-between text-gray-700 mt-6 max-w-sm mx-auto">
              <span>Subtotal:</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700 max-w-sm mx-auto">
              <span>Delivery Charges:</span>
              <span>Rs. {deliveryCharge}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-[#d0938b] border-t border-gray-200 pt-3 max-w-sm mx-auto">
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* 🧾 Step 4: Upload Proof */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Upload Payment Screenshot
            </h3>
            <p className="text-gray-600 mb-6">
              Attach a clear screenshot of your payment receipt from Easypaisa.
            </p>

            <div className="flex flex-col items-center">
              {!paymentImage ? (
                <label
                  htmlFor="paymentImage"
                  className="cursor-pointer bg-pink-50 border-2 border-dashed border-[#e8c3bd] rounded-xl px-6 py-10 w-full max-w-sm flex flex-col items-center justify-center hover:bg-pink-100 transition relative"
                >
                  <UploadCloud className="text-[#d0a19b] w-10 h-10 mb-2" />
                  <span className="text-[#d0a19b] font-medium">Click to upload</span>
                  <input
                    type="file"
                    id="paymentImage"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) =>
                      setPaymentImage(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              ) : (
                <div className="relative w-full max-w-sm bg-pink-50 border-2 border-dashed border-[#e8c3bd] rounded-xl overflow-hidden">
                  <button
                    onClick={() => setPaymentImage(null)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 rounded-full p-1 shadow-sm transition"
                    title="Remove image"
                  >
                    ✕
                  </button>
                  <img
                    src={URL.createObjectURL(paymentImage)}
                    alt="Payment screenshot"
                    className="w-full h-64 object-contain rounded-xl"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Back
              </button>

              <button
                disabled={isSubmitting}
                onClick={handleOrderSubmit}
                className={`px-8 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] hover:scale-105 transition-transform"
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Checkout;
