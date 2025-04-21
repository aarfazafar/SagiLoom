// WhatsAppFloatButton.jsx
import React from "react";

const WhatsAppFloatButton = () => {
  return (
    <a
      href="https://wa.me/919942237797"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        backgroundColor: "#25D366",
        borderRadius: "50%",
        // padding: "6px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        opacity:"80%"
      }}
      className="hover:scale-[1.1] transition-all 300 p-2 md:p-1"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="Chat on WhatsApp"
        className="w-12 h-12 lg:w-10 lg:h-10"
        
      />
    </a>
  );
};

export default WhatsAppFloatButton;
