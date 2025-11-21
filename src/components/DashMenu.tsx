"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PeopleIcon from "@mui/icons-material/People";
import ReviewsIcon from "@mui/icons-material/Reviews";
import ChatIcon from "@mui/icons-material/Chat";
import MailIcon from "@mui/icons-material/Mail";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";

const DashMenu = () => {
  const pathname = usePathname(); // Get current route

  const menuItems = [
    { id: 1, label: "Dashboard", icon: <DashboardIcon />, link: "/dashboard" },
    { id: 2, label: "Categories", icon: <CategoryIcon />, link: "/dashboard/category" },
    { id: 3, label: "SubCategories", icon: <CategoryOutlinedIcon />, link: "/dashboard/subcategory" },
    { id: 4, label: "Products", icon: <ShoppingBagIcon />, link: "/dashboard/products" },
    { id: 5, label: "Orders", icon: <InventoryIcon />, link: "/dashboard/sales" },
    { id: 6, label: "Discount", icon: <LocalOfferIcon />, link: "/dashboard/discount" },
    { id: 7, label: "Customers", icon: <PeopleIcon />, link: "/dashboard/customers" },
    { id: 8, label: "Reviews", icon: <ReviewsIcon />, link: "/dashboard/reviews" },
    { id: 9, label: "Chat", icon: <ChatIcon />, link: "/dashboard/chat" },
    { id: 10, label: "Mail", icon: <MailIcon />, link: "/dashboard/mail" },
  ];

  return (
    <div className="w-64 h-screen bg-[#43825c] text-white p-4 flex flex-col">
    
    <ul>
      {menuItems.map((item) => {
        const isActive = pathname === item.link;
        return (
          <li key={item.id} className="mb-2">
            <Link href={item.link} className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-300 
              ${isActive ? "bg-[#f4f1f0] text-[#43825c]" : "hover:bg-[#366b4d]"}`}>
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
  );
};

export default DashMenu;
