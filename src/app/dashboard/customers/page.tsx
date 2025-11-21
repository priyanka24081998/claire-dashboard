"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define type for user
interface User {
  _id: string;
  name?: string;
  lastname?: string; // <-- Add this
  email: string;
  isGoogleUser: boolean;
}
interface ManualUser {
  _id: string;
  name: string;
  lastname: string;
  emailId: {
    _id: string;
    email: string;
  };
  __v?: number;
}
type RawUser = Omit<User, "isGoogleUser">;

const Customers = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Fetch all users (Google + Manual)
  const fetchUsers = async () => {
    try {
      const [googleRes, manualRes] = await Promise.all([
        axios.get("https://claireapi.onrender.com/usermail/users"),
        axios.get("https://claireapi.onrender.com/users/all"),
      ]);
      console.log("Google Users Response:", googleRes.data);
      console.log("Manual Users Response:", manualRes.data);
      // Tag users
      const googleUsers: User[] = (googleRes?.data?.data ?? []).map(
        (user: RawUser) => ({
          ...user,
          isGoogleUser: true,
        })
      );

      const manualUsers: User[] = (manualRes?.data ?? []).map(
        (user: ManualUser) => ({
          _id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.emailId.email,
          isGoogleUser: false,
        })
      );

      setAllUsers([...googleUsers, ...manualUsers]);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Delete
  const handleDelete = async (user: User) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      if (user.isGoogleUser) {
        await axios.delete(
          `https://claireapi.onrender.com/usermail/deleteusermail/${user._id}`
        );
      } else {
        await axios.delete(
          `https://claireapi.onrender.com/users/deleteUser/${user._id}`
        );
      }

      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="container mx-auto">
        <h1 className="text-[24px] font-[poppins] mb-6 capitalize">
          Customers
        </h1>

        {/* Search input */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Search Customers..."
            className="w-[730px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#43825c]"
          />
        </div>

        {/* User list */}
        <div className="mt-6">
          <div className="flex bg-gray-200 p-3 mb-4 rounded-md font-bold">
            <span className="w-[50px]">No.</span>
            <span className="w-[200px] text-left">Name</span>
            <span className="w-[200px] text-left">Lastname</span>
            <span className="w-[400px] text-left">Email</span>
            <span className="w-[150px] text-center">Type</span>
            <span className="w-[100px] text-center">Delete</span>
          </div>
          {allUsers.map((user, index) => (
            <div
              key={user._id}
              className="flex bg-gray-100 p-3 rounded-md mb-3"
            >
              <span className="w-[50px]">{index + 1}</span>
              <span className="w-[200px]">{user.name ?? "-"}</span>
              <span className="w-[200px]">{user.lastname ?? "-"}</span>
              <span className="w-[400px] break-all">{user.email}</span>
              <span className="w-[150px] text-center">
                {user.isGoogleUser ? "Google" : "Manual"}
              </span>
              <div className="w-[100px] text-center">
                <button
                  onClick={() => handleDelete(user)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Customers;
