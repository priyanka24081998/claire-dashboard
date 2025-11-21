// "use client";

// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";

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

// const UpdateProduct = () => {
//   const { register, handleSubmit, reset, setValue, watch } =
//     useForm<ProductFormData>();
//   const [images, setImages] = useState<File[]>([]);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [existingImages, setExistingImages] = useState<string[]>([]);
//   const searchParams = useSearchParams();
//   const productId = searchParams.get("id");
//   const router = useRouter();
//   const [categories, setCategories] = useState<
//     { _id: string; categoryName: string }[]
//   >([]);
//   const [subCategories, setSubCategories] = useState<
//     { _id: string; subCategoryName: string }[]
//   >([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "https://claireapi.onrender.com/category"
//         );
//         setCategories(response.data.data);
//       } catch (error) {
//         console.error("❌ Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const response = await axios.get(
//           `https://claireapi.onrender.com/subCategory/`
//         );
//         setSubCategories(response.data.data);
//       } catch (error) {
//         console.error("❌ Error fetching subcategories:", error);
//       }
//     };

//     fetchSubCategories();
//   }, []);

//   useEffect(() => {
//     if (!productId) {
//       console.error("No product ID found in the URL.");
//       return;
//     }

//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `https://claireapi.onrender.com/product/${productId}`
//         );
//         const product = response.data.data;

//         if (!product) {
//           console.error("Product not found.");
//           return;
//         }

//         setValue("name", product.name || "");
//         setValue("description", product.description || "");
//         setValue("price", product.price || "");
//         setValue("metal", product.metal || "");
//         setValue("diamond", product.diamond || "");
//         setValue("weight", product.weight || "");
//         setValue("clarity", product.clarity || "");
//         setValue("cut", product.cut || "");
//         setValue("categoryId", product.categoryId?._id || "");
//         setValue("subCategoryId", product.subCategoryId?._id || "");
//         setExistingImages(product.images || []);
//       } catch (error) {
//         console.error("❌ Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [productId, setValue]);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
//       setImages(fileArray);
//       setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
//     }
//   };

//   const onSubmit = async (data: ProductFormData) => {
//     if (!data.categoryId || !data.subCategoryId) {
//       alert("Please select both a category and a subcategory.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("categoryId", data.categoryId.toString());
//       formData.append("subCategoryId", data.subCategoryId.toString());

//       Object.entries(data).forEach(([key, value]) => {
//         if (key !== "categoryId" && key !== "subCategoryId" && value) {
//           formData.append(key, value.toString());
//         }
//       });

//       images.forEach((image) => formData.append("images", image));
//       const token = localStorage.getItem("token");

//       await axios.patch(
//         `https://claireapi.onrender.com/product/updateProduct/${productId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Product Updated Successfully!");
//       reset();
//       router.push("/dashboard/products");
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
//       <div className="flex justify-between">
//         <h2 className="text-xl font-bold mb-4">Update Product</h2>
//         <Link href="/dashboard/products">
//           <button className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]">
//             Back
//           </button>
//         </Link>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {[
//           ["name", "Product Name"],
//           ["description", "Product Description"],
//           ["price", "Price"],
//           ["metal", "Metal Type"],
//           ["diamond", "Diamond Type"],
//           ["weight", "Weight"],
//           ["clarity", "Clarity"],
//           ["cut", "Cut Type"],
//         ].map(([key, label]) => (
//           <div key={key}>
//             <label className="block text-gray-700">{label}</label>
//             <input
//               {...register(key as keyof ProductFormData)}
//               className="border p-2 w-full rounded-md"
//             />
//           </div>
//         ))}

//         {/* Category Selection */}
//         <div>
//           <label className="block text-gray-700">Category</label>
//           <select
//             {...register("categoryId")}
//             className="border p-2 w-full rounded-md"
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.categoryName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Subcategory Selection */}
//         <div>
//           <label className="block text-gray-700">Subcategory</label>
//           {/* ✅ SubCategory Dropdown */}
//           <select
//             {...register("subCategoryId", { required: true })}
//             className="border p-2 w-full rounded-md"
//           >
//             <option value="">Select SubCategory</option>
//             {subCategories.map((sub) => (
//               <option
//                 key={sub._id}
//                 value={sub._id}
//                 defaultValue={watch("subCategoryId")} // ✅ Shows already selected subcategory
//               >
//                 {sub.subCategoryName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="block text-gray-700">Upload Images</label>
//           <input
//             type="file"
//             multiple
//             accept="image/*"
//             onChange={handleImageChange}
//             className="border p-2 w-full rounded-md"
//           />
//         </div>

//         {/* Image Previews */}
//         <div className="flex space-x-2 mt-2">
//           {[...existingImages, ...previewImages].map((img, i) => (
//             <Image
//               key={i}
//               width={1200}
//               height={800}
//               src={img}
//               alt="Preview"
//               className="w-20 h-20 object-cover rounded-md"
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
//         >
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;

"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface ProductFormData {
  name: string;
  description: string;
  price: string;
  metal: string;
  diamond: string;
  weight: string;
  subCategoryId: string;
  clarity: string;
  cut: string;
  categoryId: string;
}

const UpdateProduct = () => {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ProductFormData>();
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]); // ✅ NEW
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [previewVideos, setPreviewVideos] = useState<string[]>([]); // ✅ NEW

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [existingVideos, setExistingVideos] = useState<string[]>([]); // ✅ NEW

  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const router = useRouter();

  const [categories, setCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [subCategories, setSubCategories] = useState<
    { _id: string; subCategoryName: string }[]
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://claireapi.onrender.com/category"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(
          `https://claireapi.onrender.com/subCategory/`
        );
        setSubCategories(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching subcategories:", error);
      }
    };

    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://claireapi.onrender.com/product/${productId}`
        );

        const product = response.data.data;

        setValue("name", product.name || "");
        setValue("description", product.description || "");
        setValue("price", product.price || "");
        setValue("metal", product.metal || "");
        setValue("diamond", product.diamond || "");
        setValue("weight", product.weight || "");
        setValue("clarity", product.clarity || "");
        setValue("cut", product.cut || "");
        setValue("categoryId", product.categoryId?._id || "");
        setValue("subCategoryId", product.subCategoryId?._id || "");

        setExistingImages(product.images || []);
        setExistingVideos(product.videos || []); // ✅ NEW
      } catch (error) {
        console.error("❌ Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setVideos(fileArray);
      setPreviewVideos(fileArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    if (!data.categoryId || !data.subCategoryId) {
      alert("Please select both a category and a subcategory.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoryId", data.categoryId);
      formData.append("subCategoryId", data.subCategoryId);

      Object.entries(data).forEach(([key, value]) => {
        if (key !== "categoryId" && key !== "subCategoryId") {
          formData.append(key, value);
        }
      });

      // IMAGES
      images.forEach((img) => formData.append("images", img));

      // VIDEOS
      videos.forEach((vid) => formData.append("videos", vid)); // ✅ NEW

      const token = localStorage.getItem("token");

      await axios.patch(
        `https://claireapi.onrender.com/product/updateProduct/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Updated Successfully!");
      reset();
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <Link href="/dashboard/products">
          <button className="bg-[#43825c] text-white px-6 py-2 rounded-md hover:bg-[#366b4d]">
            Back
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {[
          ["name", "Product Name"],
          ["description", "Product Description"],
          ["price", "Price"],
          ["metal", "Metal Type"],
          ["diamond", "Diamond Type"],
          ["weight", "Weight"],
          ["clarity", "Clarity"],
          ["cut", "Cut Type"],
        ].map(([key, label]) => (
          <div key={key}>
            <label className="block text-gray-700">{label}</label>
            <input
              {...register(key as keyof ProductFormData)}
              className="border p-2 w-full rounded-md"
            />
          </div>
        ))}

        {/* Category Selection */}
        <div>
          <label className="block text-gray-700">Category</label>
          <select
            {...register("categoryId")}
            className="border p-2 w-full rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        <div>
          <label className="block text-gray-700">Subcategory</label>
          <select
            {...register("subCategoryId")}
            className="border p-2 w-full rounded-md"
            value={watch("subCategoryId")}
          >
            <option value="">Select SubCategory</option>
            {subCategories.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subCategoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 w-full rounded-md"
          />
        </div>

        {/* Image Previews */}
        <div className="flex space-x-2 mt-2 flex-wrap">
          {[...existingImages, ...previewImages].map((img, i) => (
            <Image
              key={i}
              width={1200}
              height={800}
              src={img}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-gray-700">Upload Videos</label>
          <input
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideoChange}
            className="border p-2 w-full rounded-md"
          />
        </div>

        {/* Video Previews */}
        <div className="flex space-x-3 mt-3 flex-wrap">
          {/* Existing Videos */}
          {existingVideos.map((vid, i) => (
            <video
              key={i}
              src={vid}
              className="w-28 h-20 rounded-md"
              controls
            />
          ))}

          {/* New Previews */}
          {previewVideos.map((vid, i) => (
            <video
              key={i}
              src={vid}
              className="w-28 h-20 rounded-md"
              controls
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;

