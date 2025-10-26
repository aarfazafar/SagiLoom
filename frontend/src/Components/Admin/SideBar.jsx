import React, { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  BarChart3,
  CalendarRange,
  PlusCircle,
  LogOut,
  Menu,
  Sparkle,
  Image
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Package, label: "Products", path: "/productlist" },
  { icon: Users, label: "Customers", path: "/customers" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: DollarSign, label: "Total Earnings", path: "/earnings" },
  { icon: Image, label: "Hero Section", path: "/heroimages" },
  { icon: Sparkle, label: "Best Sellers", path: "/bestSellers" },
  { icon: PlusCircle, label: "Add Best Sellers", path: "/addbestseller" },
  // { icon: BarChart3, label: "Weekly Overview", path: "/weekly" },
  // { icon: CalendarRange, label: "Monthly Overview", path: "/monthly" },
  { icon: PlusCircle, label: "Add Product", path: "/addproduct" },
];

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/");
  };
  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        className="md:hidden fixed top-4 left-3 z-50 bg-gray-800 p-2 rounded text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#1a1b23] text-gray-300 p-4 z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 mb-8">
          <Package className="h-8 w-8 text-purple-500" />
          <span className="text-xl font-semibold">Shop Admin</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const fullPath = `/admin${item.path}`;
            const isActive = location.pathname === fullPath;
            return (
              <Link
                key={index}
                to={fullPath}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-purple-500 text-white" : "hover:bg-[#2a2b36]"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2a2b36] transition-colors w-full"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default SideBar;
