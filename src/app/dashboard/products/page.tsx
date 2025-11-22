"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  description: string;
  price?: {
    "10k_yellow_gold"?: number;
    "10k_rose_gold"?: number;
    "10k_white_gold"?: number;

    "14k_yellow_gold"?: number;
    "14k_rose_gold"?: number;
    "14k_white_gold"?: number;

    "18k_yellow_gold"?: number;
    "18k_rose_gold"?: number;
    "18k_white_gold"?: number;

    silver?: number;
    platinum?: number;
  };
  metal?: string;
  diamond?: string;
  weight?: string;
  cut?: string;
  clarity?: string;
  images: string[];
  videos: string[];
  categoryId: {
    _id: string;
    categoryName: string;
  };
  subCategoryId: {
    _id: string;
    subCategoryName: string;
  };
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://claireapi.onrender.com/product/"
      );

      console.log("Fetched Data:", response.data); // Debugging

      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data); // ✅ Ensure it's an array
      } else {
        setProducts([]); // ✅ Prevent .map() errors
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Prevents map error on failure
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting product with ID:", id);
      const token = localStorage.getItem("token"); // Get token

      await axios.delete(
        `https://claireapi.onrender.com/product/deleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token
          },
        }
      );

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full p-4">
        <div className="container mx-auto">
          <h1 className="text-[24px] font-[poppins] mb-6">Products</h1>

          <div className="flex items-center justify-between gap-2 flex-wrap">
            {/* 🔎 Search Field */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-[550px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#43825c]"
            />

            <select className="w-[200px] px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-[#43825c]">
              <option value="">Sort by Price</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
            <Link href="/dashboard/products/createProduct">
              <button className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]">
                + Add Product
              </button>
            </Link>

            <div className="container mx-auto p-10">
              <h1 className="text-2xl font-semibold mb-6">Products</h1>

              {/* ✅ Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product, index) => (
                    <div
                      key={product._id}
                      className="bg-white shadow-lg p-4 rounded-lg"
                    >
                      <h4>{index + 1}</h4>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={1200}
                        height={800}
                        className="rounded-md object-cover w-full h-[200px]"
                        unoptimized
                      />
                      <h2 className="text-lg font-semibold mt-2">
                        {product.name}
                      </h2>
                      <p className="text-gray-500">{product.description}</p>
                      <p className="text-lg font-bold mt-2">
                        {product.price?.["silver"] || 0}
                      </p>                      <p className="text-sm text-gray-600">
                        {product.categoryId?.categoryName} /{" "}
                        {product.subCategoryId?.subCategoryName}
                      </p>

                      <div className="mt-4 flex gap-2">
                        <Link href={`/dashboard/products/updateProduct?id=${product._id}`}>
                          <button className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]">
                            Edit
                          </button>
                        </Link>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No products found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
