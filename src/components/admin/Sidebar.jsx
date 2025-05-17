import React from "react";
import {
  FaChartLine,
  FaBox,
  FaClipboardList,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: FaChartLine },
    { id: "add-food", label: "Add Food", icon: FaBox },
    { id: "manage-orders", label: "Manage Orders", icon: FaClipboardList },
    { id: "manage-menu", label: "Manage Menu", icon: FaBox },
    { id: "manage-admins", label: "Manage Admins", icon: FaUserShield },
  ];

  return (
    <div className="h-full bg-white">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? "bg-[#32a852] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="text-lg flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          );
        })}
        <motion.button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="text-lg flex-shrink-0" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </nav>
    </div>
  );
};

export default Sidebar;
