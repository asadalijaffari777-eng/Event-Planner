import React from "react";

export default function Services({ id, theme }) {
  return (
    <section
      id={id}
      className="w-full flex items-center justify-center bg-white dark:bg-[#0b0b0b] transition-colors"
      style={{ margin: 0 }}
    >
      <footer
        className={`w-full md:h-[50vh] transition-colors duration-300 flex flex-col justify-center ${
          theme === "dark"
            ? "bg-gradient-to-r from-[#0b0b0b] via-[#111111] to-[#1a1a1a] text-white"
            : "bg-gradient-to-r from-white via-gray-100 to-white text-black"
        }`}
        style={{
          boxShadow: "0 10px 25px rgba(153, 114, 218, 0.3)", // semi-transparent purple
        }}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 px-6 py-12">
          {/* Brand / About */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
            <h3
              className="text-3xl font-bold mb-4"
              style={{ color: "#9972da" }}
            >
            AI EVENT PLANNER 
            </h3>
            <p className="text-sm md:text-base">
              We Provide You a Free AI To Plan Your Event  
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1 flex flex-col items-center text-center">
            <ul className="space-y-2">
              {["Home", "About", "Services"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-[#9972da] transition-colors duration-200 font-medium"
                    style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="flex-1 flex flex-col items-center md:items-end text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p> bilalkhann654@gmail.com</p>
            <p>03332542971</p>
            <div className="flex gap-4 mt-4">
              {["F", "T", "I"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9972da] text-white hover:shadow-lg hover:scale-105 transform transition-all duration-200"
                  style={{
                    boxShadow: "0 4px 15px rgba(153, 114, 218, 0.4)",
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`border-t pt-6 text-center text-sm ${
            theme === "dark"
              ? "border-gray-700 text-white"
              : "border-gray-300 text-black"
          }`}
        >
          &copy; {new Date().getFullYear()} AI EVENT PLANNER . All rights reserved.
        </div>
      </footer>
    </section>
  );
}
