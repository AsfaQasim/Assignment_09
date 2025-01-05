"use client";

import React, { useState, useEffect } from "react";
import Loader from "@/app/component/loader";

interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Product = ({ params }: { params: { product: string } }) => {
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState(""); // State for the cart message

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.product}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [params.product]);

  const handleAddToCart = () => {
    setCartMessage("Item added to cart!"); 
  };

  if (isLoading) {
    return <div>
    
      <Loader/>

    </div>; 
  }

  if (!productData) {
    return <div>Error loading product data</div>;
  }

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={productData.image}
            width={100}
            height={100}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-2xl title-font text-blue-900 tracking-widest">
              {productData.title}
            </h2>

            <div className="flex mb-4">
              <span className="flex items-center">
                {/* Ratings */}
                {[...Array(4)].map((_, index) => (
                  <svg
                    key={index}
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">{productData.rating.rate}</span>
              </span>
            </div>
            <p className="leading-relaxed text-blue-900">{productData.description}</p>
            <br />
            <p className="leading-relaxed text-blue-900 font-bold">price: ${productData.price}</p>

            <button
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
              onClick={handleAddToCart} 
            >
              Add to Cart
            </button>

           
            {cartMessage && (
              <p className="mt-3 text-blue-600 font-bold">{cartMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
