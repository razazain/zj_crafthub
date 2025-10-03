import React from "react";
import Slider from "react-slick";

const CategoryHighlights = () => {
  const categories = [
    {
      title: "Handmade Bracelets",
      image:
        "https://images.pexels.com/photos/1081685/pexels-photo-1081685.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: 25,
    },
    {
      title: "Keychains",
      image:
        "https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: 15,
    },
    {
      title: "Necklaces",
      image:
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: 18,
    },
    {
      title: "Pens",
      image:
        "https://images.pexels.com/photos/384750/pexels-photo-384750.jpeg?auto=compress&cs=tinysrgb&w=800",
      count: 12,
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {categories.map((cat, index) => (
            <div key={index} className="px-4">
              <div className="flex flex-col">
                {/* Image Box with thin border */}
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden border border-gray-300">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>
                </div>

                {/* Title and Count Row */}
                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-lg font-light text-gray-800">
                    {cat.title}
                  </h3>
                  <span className="text-gray-500 text-sm">{cat.count}</span>
                </div>

                {/* Small divider line under count */}
                <div className="mt-1 w-full h-px bg-gray-300"></div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoryHighlights;
