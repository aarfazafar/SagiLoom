import React from "react";

export const Loading = () => {
  return (
    <div className="flex flex-col space-y-2 items-center justify-center h-screen w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-300 border-t-primary" />
      <div className="text-xl text-gray-600 font-semibold poppins">
        Loading...
      </div>
    </div>
  );
};
