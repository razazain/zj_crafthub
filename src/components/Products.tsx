import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";


// Add pagination interfaces
interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CategoryPagination {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}


const Products = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);

  // Category pagination states
  const [categoryPagination, setCategoryPagination] = useState<CategoryPagination>({
    total: 0,
    page: 1,
    totalPages: 1,
    limit: 10
  });
  const [categoryCurrentPage, setCategoryCurrentPage] = useState(1);

  // Products pagination states
  const [productPagination, setProductPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 8, // Show 8 products per page (2 rows of 4 on desktop)
    totalPages: 0
  });
  const [productCurrentPage, setProductCurrentPage] = useState(1);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  // 👉 Fetch Categories with pagination
  const fetchCategories = async (page: number = 1) => {
    try {
      const res = await fetch(`${API_URL}/categories?status=active&page=${page}&limit=${categoryPagination.limit}`);
      const data = await res.json();
      if (data.success) {
        setCategories([{ _id: "All", name: "All" }, ...data.categories]);
        setCategoryPagination({
          total: data.total,
          page: data.page,
          totalPages: data.totalPages,
          limit: data.limit
        });
        setCategoryCurrentPage(data.page);
      } else {
        toast.error("Failed to load categories.");
      }
    } catch (err) {
      toast.error("Error fetching categories.");
    }
  };

  // 👉 Fetch Products with pagination
  const fetchProducts = async (page: number = 1) => {
    try {
      setLoading(true);
      let endpoint = "";

      if (activeTab === "Best Sellers") {
        endpoint = `${API_URL}/products/filter/bestseller?page=${page}&limit=${productPagination.limit}&status=active`;
      } else if (selectedCategory !== "All") {
        endpoint = `${API_URL}/products/category/${selectedCategory}?page=${page}&limit=${productPagination.limit}&status=active`;
      } else {
        endpoint = `${API_URL}/products?page=${page}&limit=${productPagination.limit}&status=active`;
      }

      const res = await fetch(endpoint);
      const data = await res.json();

      if (data.success) {
        setProducts(data.products || []);
        setProductPagination(data.pagination);
        setProductCurrentPage(data.pagination.page);
      } else {
        setProducts([]);
        toast.error("Product Comming Soon");
      }
    } catch (err) {
      toast.error("Error fetching products.");
    } finally {
      setLoading(false);
    }
  };

  // Handle category page change
  const handleCategoryPageChange = async (newPage: number) => {
    await fetchCategories(newPage);
  };

  // Handle product page change
  const handleProductPageChange = async (newPage: number) => {
    await fetchProducts(newPage);
  };

  const openImageModal = (images: string[]) => {
    setModalImages(images);
    setCurrentImageIndex(0);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
    setModalImages([]);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? modalImages.length - 1 : prev - 1
    );
  };

  // Reset product page when changing tabs or categories
  useEffect(() => {
    setProductCurrentPage(1);
    fetchProducts(1);
  }, [activeTab, selectedCategory]);

  // Reset category page when component mounts
  useEffect(() => {
    fetchCategories(1);
  }, []);

  // Optional: Keyboard support for image modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!imageModalOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeImageModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imageModalOpen]);

  const handleAddToWishlist = async (product: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/profile");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`${product.name} added to wishlist!`);
      } else {
        toast.error(data.message || "Failed to add to wishlist.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  // 👉 Open modal
  const openCartModal = (product: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/profile");
      return;
    }
    setSelectedProduct(product);
    setQuantity(1); // reset quantity
    setIsModalOpen(true);
  };

  // 👉 Handle Add to Cart API
  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/profile");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`${selectedProduct.name} added to cart!`);
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to add to cart.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Tabs ===== */}
        <div className="flex flex-wrap justify-center sm:justify-start space-x-6 border-b border-gray-200 pb-4 mb-6">
          {["All", "Best Sellers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-base sm:text-lg font-medium border-b-2 transition-colors duration-200 ${activeTab === tab
                ? "border-[#d0a19b] text-[#d0a19b]"
                : "border-transparent text-black hover:text-[#d0a19b]"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ===== Layout ===== */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* ===== Sidebar ===== */}
          {activeTab !== "Best Sellers" && (
            <aside className="md:w-64 bg-white p-4 rounded-lg shadow-sm h-fit">
              <h3 className="text-lg font-semibold text-black mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <button
                      onClick={() => setSelectedCategory(cat._id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${selectedCategory === cat._id
                        ? "bg-[#d0a19b] text-white font-medium"
                        : "text-black hover:bg-[#f5e6e2]"
                        }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Category Pagination */}
              {categoryPagination.totalPages > 1 && (
                <div className="mt-4 flex justify-center items-center space-x-1">
                  <button
                    onClick={() => handleCategoryPageChange(categoryCurrentPage - 1)}
                    disabled={categoryCurrentPage === 1}
                    className={`px-2 py-1 text-sm rounded-md ${
                      categoryCurrentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#d0a19b] text-white hover:bg-[#b58983]"
                    } transition-colors duration-200`}
                  >
                    ←
                  </button>
                  
                  <span className="text-sm text-gray-600 px-2">
                    {categoryCurrentPage} / {categoryPagination.totalPages}
                  </span>
                  
                  <button
                    onClick={() => handleCategoryPageChange(categoryCurrentPage + 1)}
                    disabled={categoryCurrentPage === categoryPagination.totalPages}
                    className={`px-2 py-1 text-sm rounded-md ${
                      categoryCurrentPage === categoryPagination.totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#d0a19b] text-white hover:bg-[#b58983]"
                    } transition-colors duration-200`}
                  >
                    →
                  </button>
                </div>
              )}
            </aside>
          )}

          {/* ===== Product Grid ===== */}
          <div className="flex-1">
            {loading ? (
              <p className="text-gray-600 text-center">Loading products...</p>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {products.map((product: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col"
                    >
                      <div
                        className="relative overflow-hidden cursor-pointer"
                        onClick={() => openImageModal(product.images.map((img: any) => img.url))}
                      >
                        <img
                          src={product.images && product.images[0]?.url}
                          alt={product.name}
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Wishlist Button */}
                        <div className="absolute top-2 right-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // prevent triggering image modal
                              handleAddToWishlist(product);
                            }}
                            className="bg-white p-2 rounded-full shadow-md hover:bg-pink-50 transition transform hover:scale-110"
                          >
                            <Heart className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                            {product.name}
                          </h3>

                          {/* Price */}
                          <p className="text-lg font-bold text-[#d0a19b] mb-2">
                            Rs. {product.price}
                          </p>

                          {/* Description */}
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => openCartModal(product)}
                          className="mt-4 py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Product Pagination */}
                {productPagination.totalPages > 1 && (
                  <div className="mt-8 flex flex-col items-center space-y-3">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => handleProductPageChange(productCurrentPage - 1)}
                        disabled={productCurrentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          productCurrentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#d0a19b] text-white hover:bg-[#b58983]"
                        } transition-colors duration-200`}
                      >
                        Previous
                      </button>
                      
                      {/* Page Numbers - Show limited numbers on mobile */}
                      <div className="flex space-x-1">
                        {Array.from({ length: Math.min(5, productPagination.totalPages) }, (_, i) => {
                          let pageNum;
                          if (productPagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else {
                            // Show pages around current page
                            const start = Math.max(1, productCurrentPage - 2);
                            const end = Math.min(productPagination.totalPages, start + 4);
                            pageNum = start + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handleProductPageChange(pageNum)}
                              className={`hidden sm:block w-8 h-8 rounded-md ${
                                productCurrentPage === pageNum
                                  ? "bg-[#d0938b] text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              } transition-colors duration-200`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Mobile Page Indicator */}
                      <span className="sm:hidden text-sm text-gray-600">
                        Page {productCurrentPage} of {productPagination.totalPages}
                      </span>
                      
                      <button
                        onClick={() => handleProductPageChange(productCurrentPage + 1)}
                        disabled={productCurrentPage === productPagination.totalPages}
                        className={`px-3 py-1 rounded-md ${
                          productCurrentPage === productPagination.totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#d0a19b] text-white hover:bg-[#b58983]"
                        } transition-colors duration-200`}
                      >
                        Next
                      </button>
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      Showing {products.length} of {productPagination.total} products
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-600 text-center">
                Product comming soon for the selected category.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ===== Product Image Viewer Modal ===== */}
      {imageModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking on image
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition"
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={modalImages[currentImageIndex]}
              alt="Product preview"
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-lg"
            />

            {/* Prev / Next buttons */}
            {modalImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full px-3 py-1"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-40 hover:bg-opacity-70 rounded-full px-3 py-1"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ===== Add to Cart Modal ===== */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-80 sm:w-96">
            <h2 className="text-lg font-semibold mb-4">{selectedProduct.name}</h2>
            <img
              src={selectedProduct.images[0]?.url}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <label className="block mb-2 font-medium">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="px-4 py-2 rounded-md bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium hover:scale-105 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;