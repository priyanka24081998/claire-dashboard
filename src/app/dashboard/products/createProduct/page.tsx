// "use client";

// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface ProductFormData {
//   name: string;
//   description: string;
//   price: string;
//   metal: string;
//   diamond: string;
//   weight: string;
//   subCategoryId: string;
//   clarity: string;
//   cut: string;
//   categoryId: string;
// }

// const CreateProduct = () => {
//   const { register, handleSubmit, reset, setValue } = useForm<ProductFormData>();
//   const [images, setImages] = useState<File[]>([]);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [categories, setCategories] = useState<{ _id: string; categoryName: string }[]>([]);
//   const [subCategories, setSubCategories] = useState<{ _id: string; subCategoryName: string }[]>([]);
//   // const [selectedCategory, setSelectedCategory] = useState<string>(""); 
//   const router = useRouter();

//   // ✅ Fetch Categories & Subcategories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("https://claireapi.onrender.com/category");
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error("❌ Error fetching categories:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // ✅ Fetch Subcategories when category changes
//   useEffect(() => {

//     const fetchSubCategories = async () => {
//       try {
//         const response = await axios.get(`https://claireapi.onrender.com/subCategory/`);
//         setSubCategories(response.data.data);
//       } catch (error) {
//         console.error("❌ Error fetching subcategories:", error);
//       }
//     };

//     fetchSubCategories();
//   }, []);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       setImages(fileArray);
//       setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
//     }
//   };

//   const onSubmit = async (data: ProductFormData) => {
//     try {
//       const formData = new FormData();
//       formData.append("categoryId", data.categoryId);
//       formData.append("subCategoryId", data.subCategoryId);

//       Object.entries(data).forEach(([key, value]) => {
//         if (key !== "categoryId" && key !== "subCategoryId" && value) {
//           formData.append(key, value.toString());
//         }
//       });

//       images.forEach((image) => formData.append("images", image));

//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://claireapi.onrender.com/product/createProduct/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("✅ Product Created:", response.data);
//       alert("Product Created Successfully!");
//       reset();
//       setImages([]);
//       setPreviewImages([]);
//       router.push("/dashboard/products");
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("❌ Error creating product:", error.response?.data || error.message);
//         alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
//       } else {
//         console.error("❌ Unexpected error:", error);
//         alert("An unexpected error occurred.");
//       }
//     }
//   };

//   return (
//     <div className="w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
//       <div className="flex justify-between">
//         <h2 className="text-xl font-bold mb-4">Add New Product</h2>
//         <Link href="/dashboard/products">
//           <button className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]">
//             Back
//           </button>
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

//   <div>
//     <label className="block font-medium">Product Name</label>
//     <input {...register("name", { required: true })} placeholder="Product Name" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Product Description</label>
//     <textarea {...register("description", { required: true })} placeholder="Product Description" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Price</label>
//     <input {...register("price", { required: true })} placeholder="Price" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Metal Type</label>
//     <input {...register("metal", { required: true })} placeholder="Metal Type" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Diamond Size</label>
//     <input {...register("diamond", { required: true })} placeholder="Diamond Size" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Weight</label>
//     <input {...register("weight", { required: true })} placeholder="Weight" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Clarity</label>
//     <input {...register("clarity", { required: true })} placeholder="Clarity" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Cut Type</label>
//     <input {...register("cut", { required: true })} placeholder="Cut Type" className="border p-2 w-full rounded-md" />
//   </div>

//   <div>
//     <label className="block font-medium">Category</label>
//     <select {...register("categoryId", { required: true })}
//       className="border p-2 w-full rounded-md"
//       onChange={(e) => setValue("categoryId", e.target.value)}
//     >
//       <option value="">Select Category</option>
//       {categories.map((cat) => (
//         <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
//       ))}
//     </select>
//   </div>

//   <div>
//     <label className="block font-medium">SubCategory</label>
//     <select {...register("subCategoryId", { required: true })}
//       className="border p-2 w-full rounded-md"
//       onChange={(e) => setValue("subCategoryId", e.target.value)}
//     >
//       <option value="">Select SubCategory</option>
//       {subCategories.map((sub) => (
//         <option key={sub._id} value={sub._id}>{sub.subCategoryName}</option>
//       ))}
//     </select>
//   </div>

//   <div>
//     <label className="block font-medium">Upload Images</label>
//     <input type="file" multiple accept="image/*" onChange={handleImageChange} className="border p-2 w-full rounded-md" />
//   </div>

//   <div className="flex space-x-2 mt-2">
//     {previewImages.map((img, i) => (
//       <Image key={i} width={1200} height={800} src={img} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
//     ))}
//   </div>



//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateProduct;


"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductFormData {
  name: string;
  description: string;
  "10k_yellow_gold": string;
  "10k_rose_gold": string;
  "10k_white_gold": string;

  "14k_yellow_gold": string;
  "14k_rose_gold": string;
  "14k_white_gold": string;

  "18k_yellow_gold": string;
  "18k_rose_gold": string;
  "18k_white_gold": string;

  silver: string;
  platinum: string;
   metal: string;
  diamond: string;
  weight: string;
  subCategoryId: string;
  clarity: string;
  cut: string;
  categoryId: string;
}

const CreateProduct = () => {
  const { register, handleSubmit, reset, setValue } = useForm<ProductFormData>();
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  // ✅ Added for videos
  const [videos, setVideos] = useState<File[]>([]);
  const [previewVideos, setPreviewVideos] = useState<string[]>([]);

  const [categories, setCategories] = useState<{ _id: string; categoryName: string }[]>([]);
  const [subCategories, setSubCategories] = useState<{ _id: string; subCategoryName: string }[]>([]);
  const router = useRouter();

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://claireapi.onrender.com/category");
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch SubCategories
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("https://claireapi.onrender.com/subCategory/");
        setSubCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubCategories();
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  // ✅ Handle video input
  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setVideos(fileArray);
      setPreviewVideos(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData();
      formData.append("categoryId", data.categoryId);
      formData.append("subCategoryId", data.subCategoryId);

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "categoryId" && key !== "subCategoryId" && value) {
          formData.append(key, value.toString());
        }
      });

      // Images
      images.forEach((image) => formData.append("images", image));

      // ✅ Videos
      videos.forEach((video) => formData.append("videos", video));

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://claireapi.onrender.com/product/createProduct/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("✅ Product Created:", response.data);
      alert("Product Created Successfully!");
      reset();
      setImages([]);
      setPreviewImages([]);
      setVideos([]);
      setPreviewVideos([]);
      router.push("/dashboard/products");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Error creating product:", error.response?.data || error.message);
        alert(`Failed to create product: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("❌ Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <Link href="/dashboard/products">
          <button className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]">
            Back
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">

        <div>
          <label className="block font-medium">Product Name</label>
          <input {...register("name", { required: true })} placeholder="Product Name" className="border p-2 w-full rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Product Description</label>
          <textarea {...register("description", { required: true })} placeholder="Product Description" className="border p-2 w-full rounded-md" />
        </div>

        {/* <div>
          <label className="block font-medium">Price</label>
          <input {...register("price", { required: true })} placeholder="Price" className="border p-2 w-full rounded-md" />
        </div> */}

        {/* METAL-WISE PRICE FIELDS */}
        <h3 className="text-lg font-semibold mt-4">Pricing</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* 10K */}
          <div>
            <label className="block font-medium">10k Yellow Gold Price</label>
          <input {...register("10k_yellow_gold")} placeholder="10k Yellow Gold Price" className="border p-2 rounded-md" />
          </div>
          <div>
          <label className="block font-medium">10k Rose Gold Price</label>
          <input {...register("10k_rose_gold")} placeholder="10k Rose Gold Price" className="border p-2 rounded-md" />
          </div>
          <div>
            <label className="block font-medium">10k White Gold Price</label>
          <input {...register("10k_white_gold")} placeholder="10k White Gold Price" className="border p-2 rounded-md" />
          </div>

          {/* 14K */}
          <div>
          <label className="block font-medium">14k Yellow Gold Price</label>
          <input {...register("14k_yellow_gold")} placeholder="14k Yellow Gold Price" className="border p-2 rounded-md" />
          </div>
          <div>
          <label className="block font-medium">14k Rose Gold Price</label>
          <input {...register("14k_rose_gold")} placeholder="14k Rose Gold Price" className="border p-2 rounded-md" />
          </div>
          <div>
          <label className="block font-medium">14k White Gold Price</label>
          <input {...register("14k_white_gold")} placeholder="14k White Gold Price" className="border p-2 rounded-md" />
          </div>


          {/* 18K */}
          <div>
          <label className="block font-medium">18k Yellow Gold Price</label>
          <input {...register("18k_yellow_gold")} placeholder="18k Yellow Gold Price" className="border p-2 rounded-md" />
          </div>
          <div>
          <label className="block font-medium">18k Rose Gold Price</label>
          <input {...register("18k_rose_gold")} placeholder="18k Rose Gold Price" className="border p-2 rounded-md" />
          </div>
          <div>
          <label className="block font-medium">18k White Gold Price</label>
          <input {...register("18k_white_gold")} placeholder="18k White Gold Price" className="border p-2 rounded-md" />
          </div>


          {/* SILVER & PLATINUM */}
          <div>
          <label className="block font-medium">Silver Price</label>
          <input {...register("silver")} placeholder="Silver Price" className="border p-2 rounded-md" />
          </div>
          <div>
          <label className="block font-medium">Platinum Price</label>
          <input {...register("platinum")} placeholder="Platinum Price" className="border p-2 rounded-md" />
          </div>

        </div>


        <div>
          <label className="block font-medium">Metal Type</label>
          <input {...register("metal", { required: true })} placeholder="Metal Type" className="border p-2 w-full rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Diamond type</label>
          <input {...register("diamond", { required: true })} placeholder="Diamond type" className="border p-2 w-full rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Weight</label>
          <input {...register("weight", { required: true })} placeholder="Weight" className="border p-2 w-full rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Clarity</label>
          <input {...register("clarity", { required: true })} placeholder="Clarity" className="border p-2 w-full rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Cut Type</label>
          <input {...register("cut", { required: true })} placeholder="Cut Type" className="border p-2 w-full rounded-md" />
        </div>

        <div>
          <label className="block font-medium">Category</label>
          <select {...register("categoryId", { required: true })}
            className="border p-2 w-full rounded-md"
            onChange={(e) => setValue("categoryId", e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">SubCategory</label>
          <select {...register("subCategoryId", { required: true })}
            className="border p-2 w-full rounded-md"
            onChange={(e) => setValue("subCategoryId", e.target.value)}
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>{sub.subCategoryName}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Upload Images</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="border p-2 w-full rounded-md" />
        </div>

        <div className="flex space-x-2 mt-2">
          {previewImages.map((img, i) => (
            <Image key={i} width={1200} height={800} src={img} alt="Preview" className="w-20 h-20 object-cover rounded-md" />
          ))}
        </div>

        {/* ✅ Video upload */}
        <div>
          <label className="block font-medium">Upload Videos</label>
          <input type="file" multiple accept="video/*" onChange={handleVideoChange} className="border p-2 w-full rounded-md" />
        </div>

        <div className="flex space-x-2 mt-2">
          {previewVideos.map((vid, i) => (
            <video key={i} src={vid} controls className="w-24 h-24 rounded-md" />
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;


