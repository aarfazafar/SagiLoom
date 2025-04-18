import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/outline";
const UserDropdown = ({ user, logout, role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* User Icon (Button) */}
      <button
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full flex items-center justify-center hover:ring-1 ring-[#fbf7f6]/70 transition"
      >
        {/* Replace with your own user icon */}
        <UserIcon aria-hidden="true" className="size-6" />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 4 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
          >
            <div className="space-y-2 px-4 py-4">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left text-sm text-gray-700 hover:text-indigo-600 transition"
                  >
                    Logout
                  </button>
                  {role === "admin" && (
                    <Link to="/admin" className="flow-root">
                      <div className="w-full text-left text-sm text-gray-700 hover:text-indigo-600 transition">
                        Admin Panel
                      </div>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-gray-700 hover:text-indigo-600 transition"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block text-sm text-gray-700 hover:text-indigo-600 transition"
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserDropdown;
