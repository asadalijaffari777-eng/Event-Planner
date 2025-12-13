import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0b0b0b] px-4">
      <h1 className="text-5xl font-bold text-[#111827] dark:text-[#f3f4f6] mb-6">
        404 - Page Not Found
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-xl bg-[#9972da] text-white hover:bg-[#d1c1f1] shadow-md transition"
      >
        Go Back Home
      </button>
    </div>
  );
}
