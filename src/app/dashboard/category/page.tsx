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

// ✅ Define the Category Type
interface Category {
  _id: string;
  categoryName: string;
}

const Category = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const getToken = () => localStorage.getItem("token");

  // 📌 Fetch Categories from API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://claireapi.onrender.com/category/");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 📌 Open & Close Dialog
  const handleClickOpen = () => {
    setCategoryName("");
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // 📌 Handle Submit (Add / Update Category)
  const handleSubmit = async () => {
    const token = getToken();
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    try {
      if (editId) {
        await axios.patch(
          `https://claireapi.onrender.com/category/updateCategory/${editId}`,
          { categoryName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          "https://claireapi.onrender.com/category/createCategory/",
          { categoryName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // 📌 Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const token = getToken();
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    try {
      await axios.delete(
        `https://claireapi.onrender.com/category/deleteCategory/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  // 📌 Handle Edit
  const handleEdit = (category: Category) => {
    setCategoryName(category.categoryName);
    setEditId(category._id);
    setOpen(true);
  };

  return (
    <div className="p-4">
      <div className="w-full">
        <div className="container mx-auto">
          <h1 className="text-[24px] capitalize font-[poppins] mb-6">
            Category
          </h1>

          <div className="flex items-center justify-between gap-4">
            <input
              type="text"
              
              placeholder="Search Category..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#43825c]"
            />

            <button
              onClick={handleClickOpen}
              className="bg-[#43825c] w-[200px] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]"
            >
              + Add Category
            </button>
          </div>

          {/* 📌 Category List */}
          <div className="mt-6">
            <div className="grid grid-cols-4 bg-gray-200 p-3 mb-4 rounded-md font-bold">
              <span>No.</span>
              <span>Category Name</span>
              <span className="text-right pr-4">Edit</span>
              <span className="text-right pr-4">Delete</span>
            </div>
            {categories.map((category,index) => (
              <div
                key={category._id}
                className="grid grid-cols-4 bg-gray-100 p-3 rounded-md mb-3"
              >
                <span>{index + 1}</span>
                <span className="capitalize">{category.categoryName}</span>
                <div className="text-right">
                  <button
                    onClick={() => handleEdit(category)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => handleDelete(category._id)}
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

      {/* 📌 Add / Edit Category Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent className="w-[500px]">
          <TextField
            label="Category Name"
            fullWidth
            margin="dense"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
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
  );
};

export default Category;
