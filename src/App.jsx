// src/App.jsx
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

import Navbar from "./components/Navbar";
import AIButton from "./components/AIButton";
import Auth from "./components/Auth";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";

// Theme context for usage if needed
export const ThemeContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  // Firebase auth
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // Apply / remove dark class globally
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  // If not authenticated show Auth page only (Auth is light-only)
  if (!user) return <Auth />;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* Floating AI button (keeps working as before) */}
        <AIButton />

        <main className="transition-colors duration-300">
          <Routes>
            {/* Single-page root: Home + sections (IDs passed via props) */}
            <Route
              path="/"
              element={
                <>
                  <Home id="home" />
                  <About id="about" />
                  <Services id="services" />
                </>
              }
            />

            {/* AI Assistant route */}
            <Route path="/ai" element={<AIAssistant />} />

            {/* NotFound for unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </ThemeContext.Provider>
  );
}
