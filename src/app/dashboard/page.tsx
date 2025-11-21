"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login"); // Redirect if not logged in
  }, [router]);
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Redirect to the home page or login page
    router.push("/");
  };

  return (
    <>
      <div className="w-full p-4">
        <div className="container mx-auto">
          <Toolbar className="flex justify-between items-center">
            <h1 className="text-[24px] font-[poppins]">Dashboard</h1>
            <Link href="/">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded ml-auto"
              >
                Log Out
              </button>
            </Link>
          </Toolbar>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Orders Card */}
            <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-full">
                📦 {/* Replace with an icon */}
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Orders</h2>
                <p className="text-2xl font-semibold">1,234</p>
              </div>
            </div>

            {/* Products Card */}
            <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-full">
                🏷️ {/* Replace with an icon */}
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Products</h2>
                <p className="text-2xl font-semibold">567</p>
              </div>
            </div>

            {/* Sales Card */}
            <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
              <div className="bg-yellow-100 p-3 rounded-full">
                💰 {/* Replace with an icon */}
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Sales</h2>
                <p className="text-2xl font-semibold">$12,345</p>
              </div>
            </div>

            {/* Customers Card */}
            <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between hover:shadow-lg transition-shadow duration-300">
              <div className="bg-red-100 p-3 rounded-full">
                👥 {/* Replace with an icon */}
              </div>
              <div>
                <h2 className="text-sm text-gray-500">Customers</h2>
                <p className="text-2xl font-semibold">890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
