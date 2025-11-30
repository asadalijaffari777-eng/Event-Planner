// src/components/Navbar.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import PillNav from "./PillNav";

export default function Navbar({ theme, toggleTheme }) {
  const location = useLocation();
  const navigate = useNavigate();

  // activeHref includes pathname + hash for matching active pill
  const [activeHref, setActiveHref] = useState(location.pathname + location.hash);

  useEffect(() => {
    setActiveHref(location.pathname + location.hash);
  }, [location.pathname, location.hash]);

  // Nav items: normal pills + two special pills
  const navItems = [
    { id: "home", label: "Home", href: "/#home" },
    { id: "about", label: "About", href: "/#about" },
    { id: "services", label: "Services", href: "/#services" },

    // special pills (no href)
    { type: "theme-toggle", id: "theme-toggle" },
    { type: "logout", id: "logout" },
  ];

  // Smooth scroll / navigate handler
  const handlePillClick = useCallback(
    (item) => {
      if (!item) return;

      // special types handled by PillNav directly via onThemeToggle / onLogout
      if (item.type) return;

      // item.href expected like "/#about" or "/"
      const href = item.href || "/";
      const [pathPart, hashPart] = href.split("#");

      const targetPath = pathPart || "/";
      const hash = hashPart ? `#${hashPart}` : "";

      // If already on same path, scroll to the element if hash exists
      const currentPath = window.location.pathname;
      if (targetPath === currentPath || targetPath === "/") {
        if (hash) {
          const id = hash.replace("#", "");
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            // update URL hash without navigation
            history.replaceState(null, "", `${targetPath}${hash}`);
          } else {
            // if element not present (rare), still navigate to path
            navigate(targetPath + hash);
          }
        } else {
          // plain path navigation
          navigate(targetPath);
        }
        return;
      }

      // Different path: navigate to path + hash. After route loads user will see content.
      navigate(targetPath + hash);
    },
    [navigate]
  );

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged in App.jsx will handle showing Auth screen
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="fixed top-4 left-0 w-full flex justify-center z-[999] pointer-events-auto">
      <div className="w-full max-w-6xl px-4">
        <div className="flex items-center justify-center">
          <PillNav
            items={navItems}
            activeHref={activeHref}
            onPillClick={(item) => handlePillClick(item)}
            onThemeToggle={toggleTheme}
            onLogout={handleLogout}
            theme={theme}
            className=""
          />
        </div>
      </div>
    </div>
  );
}
