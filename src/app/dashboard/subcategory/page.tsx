"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Category {
  _id: string;
  categoryName: string;
}

interface SubCategory {
  _id: string;
  subCategoryName: string;
  categoryId: {
    _id: string;
    categoryName: string;
  } | null;
}

const SubCategory = () => {
  const [open, setOpen] = useState(false);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // Store categories
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(""); // Selected category
  const [editId, setEditId] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  
  // 📌 Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://claireapi.onrender.com/subCategory");
      setSubCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // 📌 Fetch Main Categories
  const fetchMainCategories = async () => {
    try {
      const response = await axios.get("https://claireapi.onrender.com/category/");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchMainCategories(); // Fetch categories on mount
  }, []);

  // 📌 Open & Close Dialog
  const handleClickOpen = () => {
    setSubCategoryName("");
    setSelectedCategoryId(""); // Reset category selection
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // 📌 Handle Submit (Add / Update SubCategory)
  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.patch(
          `https://claireapi.onrender.com/subCategory/updateSubCategory/${editId}`,
          { subCategoryName, categoryId: selectedCategoryId },
          { headers: { Authorization: `Bearer ${token}` },} 
        );
      } else {
        await axios.post(
          "https://claireapi.onrender.com/subCategory/createSubCategory",
          { subCategoryName, categoryId: selectedCategoryId },
          { headers: { Authorization: `Bearer ${token}` },} // 🔹 Send token directly
        );
      }
  

      await fetchCategories(); // 🔹 Fetch updated subcategories
      await fetchMainCategories(); // 🔹 Ensure categories are up to date

      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // 📌 Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) return;

    try {
      await axios.delete(`https://claireapi.onrender.com/subCategory/deleteSubCategory/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCategories();
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  // 📌 Handle Edit
  const handleEdit = (subCategory: SubCategory) => {
    setSubCategoryName(subCategory.subCategoryName);
    setSelectedCategoryId(
      subCategory.categoryId?.categoryName || "Uncategorized"
    ); // Set category if available
    setEditId(subCategory._id);
    setOpen(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="w-full">
          <div className="container mx-auto">
            <h1 className="text-[24px] capitalize font-[poppins] mb-6">
              Sub Category
            </h1>

            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                placeholder="Search Sub Category..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#43825c]"
              />

              <button
                onClick={handleClickOpen}
                className="bg-[#43825c] w-[250px] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]"
              >
                + Add Sub Category
              </button>
            </div>

            {/* 📌 SubCategory List */}
            <div className="mt-6">
              <div className="grid grid-cols-5 bg-gray-200 p-3 mb-4 rounded-md font-bold">
              <span>No.</span>
              <span>Sub Category Name</span>
              <span>Category Name</span>
                <span className="text-right pr-4">Edit</span>
                <span className="text-right pr-4">Delete</span>

              </div>
              {subCategories.map((subCategory,index) => (
                <div
                  key={subCategory._id}
                  className="grid grid-cols-5 bg-gray-100 p-3 rounded-md mb-3"
                > 
                <span>{index + 1}</span>
                  <span className="capitalize">
                    {subCategory.subCategoryName}
                  </span>
                  <span className="capitalize text-gray-600">
                    {subCategory.categoryId?.categoryName || "Uncategorized"}
                  </span>{" "}
                  {/* 🔹 Show category name */}
                  <div className="text-right">
                    <button
                      onClick={() => handleEdit(subCategory)}
                      className="bg-blue-500  text-white px-4 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    </div>
                    <div className="text-right">
                    <button
                      onClick={() => handleDelete(subCategory._id)}
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

        {/* 📌 Add/Edit SubCategory Dialog */}
        <Dialog open={open} onClose={handleClose} >
          <DialogTitle>
            {editId ? "Edit Sub Category" : "Add Sub Category"}
          </DialogTitle>
          <DialogContent className="w-[500px]">
            <TextField
              label="Sub Category Name"
              fullWidth
              margin="dense"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />

            {/* 📌 Category Dropdown */}
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <button
              onClick={handleSubmit}
              className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]"
            >
              {editId ? "Update" : "Add"}
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default SubCategory;
