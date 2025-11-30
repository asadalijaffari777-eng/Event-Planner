import React from "react";
import { useNavigate } from "react-router-dom";

export default function AIButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/ai")}
      className="fixed bottom-6 right-6 z-50 bg-[#9972da] text-white py-3 px-4 rounded-full shadow-lg hover:bg-[#d1c1f1] transition"
      aria-label="Open AI Assistant"
      title="AI Assistant"
    >
      🤖
    </button>
  );
}
