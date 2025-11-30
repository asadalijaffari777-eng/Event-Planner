import React from "react";
import { useNavigate } from "react-router-dom";

export default function AIAssistant() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0b0b0b] transition-colors duration-300 px-4 py-12 sm:py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f3f4f6] mb-6 text-center">
        AI Assistant
      </h1>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 sm:p-8 bg-white dark:bg-[#222] rounded-2xl shadow-[0_4px_20px_rgba(153,114,218,0.4)] space-y-4 transition-colors duration-300">
        <input
          type="text"
          placeholder="Type your query..."
          className="w-full p-3 sm:p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-[#fdfdfd] dark:bg-[#222] text-[#111827] dark:text-[#f3f4f6] focus:outline-none focus:ring-2 focus:ring-[#9972da] transition"
        />

        <button
          onClick={() => {}}
          className="w-full py-2 sm:py-3 rounded-xl bg-[#9972da] text-white hover:bg-[#d1c1f1] shadow-md transition"
        >
          Submit
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full py-2 sm:py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 shadow-md transition"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}
