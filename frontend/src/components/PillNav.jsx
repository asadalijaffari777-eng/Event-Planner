// src/components/PillNav.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PillNav = ({
  items = [],
  activeHref = "",
  onPillClick,
  onThemeToggle,
  onLogout,
  theme = "light",
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pillRefs = useRef([]);
  const tlRefs = useRef([]);
  const navRef = useRef(null);

  // Hover animation effect
  useEffect(() => {
    const hoverBg = theme === "dark" ? "#ffffff" : "#000000";
    const hoverText = theme === "dark" ? "#000000" : "#ffffff";

    pillRefs.current.forEach((pill, idx) => {
      if (!pill) return;

      const circle = pill.querySelector(".hover-circle");
      const label = pill.querySelector(".pill-label");

      tlRefs.current[idx]?.kill();
      gsap.set(circle, { scale: 0, transformOrigin: "50% 50%" });

      const tl = gsap.timeline({ paused: true });
      tl.to(circle, { scale: 1.05, duration: 0.35, ease: "power3.out" }, 0);
      tl.to(
        pill,
        { backgroundColor: hoverBg, duration: 0.35, ease: "power3.out", overwrite: "auto" },
        0
      );
      tl.to(
        label,
        { y: -6, color: hoverText, duration: 0.35, ease: "power3.out", overwrite: "auto" },
        0
      );

      tlRefs.current[idx] = tl;
    });

    return () => {
      tlRefs.current.forEach((t) => t?.kill?.());
    };
  }, [items, theme]);

  const handleEnter = (i) => tlRefs.current[i]?.play();
  const handleLeave = (i) => tlRefs.current[i]?.reverse();

  // Scroll hide/show effect
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    const sectionIds = items
      .map((it) => (it.href?.includes("#") ? it.href.split("#")[1] : null))
      .filter(Boolean);
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const inSectionTop20 = (scrollY) =>
      sections.some((sec) => scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight * 0.2);

    let lastY = window.scrollY;
    let ticking = false;
    const TH = 10;

    const hideStyles = { transform: "translateY(-120%)", opacity: "0", pointerEvents: "none" };
    const showStyles = { transform: "translateY(0)", opacity: "1", pointerEvents: "auto" };

    Object.assign(navEl.style, showStyles);

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (inSectionTop20(currentY)) Object.assign(navEl.style, showStyles);
          else if (delta < -TH) Object.assign(navEl.style, showStyles);
          else if (delta > TH && currentY > 60) Object.assign(navEl.style, hideStyles);

          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {};
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [items]);

  // Render each pill
  const renderPill = (item, i) => {
    const isActive = false; // no pill active initially
    const baseClasses =
      "relative flex-shrink-0 px-5 py-2 rounded-full font-semibold overflow-hidden whitespace-nowrap transition-colors duration-200";

    const activeBg = theme === "dark" ? "#ffffff" : "#000000";
    const activeText = theme === "dark" ? "#000000" : "#ffffff";

    // ✅ Only Home, About, Service are initially white in dark mode
    const initialWhitePills = ["Home", "About", "Service"];
    const textColor =
      isActive
        ? activeText
        : theme === "dark" && initialWhitePills.includes(item.label)
        ? "#ffffff"
        : theme === "dark"
        ? "#cccccc"
        : "#000000";

    return (
      <button
        key={i}
        ref={(el) => (pillRefs.current[i] = el)}
        className={baseClasses}
        style={{
          backgroundColor: isActive ? activeBg : "transparent",
          color: textColor,
        }}
        onClick={() => onPillClick?.(item)}
        onMouseEnter={() => handleEnter(i)}
        onMouseLeave={() => handleLeave(i)}
        aria-current={isActive ? "true" : undefined}
      >
        <span
          aria-hidden="true"
          className="hover-circle absolute left-1/2 top-1/2 w-16 h-16 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <span className="pill-label relative z-10">{item.label}</span>

        {isActive && (
          <span
            aria-hidden="true"
            style={{ backgroundColor: theme === "dark" ? "#ffffff" : "#000000" }}
            className="absolute left-1/2 -bottom-2 w-2 h-2 rounded-full -translate-x-1/2"
          />
        )}
      </button>
    );
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-4 left-0 w-full flex justify-center z-[999] pointer-events-auto transition-all duration-300"
      aria-label="Primary"
      style={{ WebkitBackdropFilter: "saturate(120%) blur(6px)", backdropFilter: "saturate(120%) blur(6px)" }}
    >
      <div className="w-full max-w-6xl px-4">
        {/* Mobile */}
        <div className="md:hidden flex justify-between items-center">
          <div
            className="flex items-center justify-between w-full px-3 py-2 rounded-full"
            style={{ backgroundColor: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.9)" }}
          >
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className="text-black dark:text-white text-2xl p-2"
            >
              ☰
            </button>

            <div className="flex gap-2 items-center">
              {items
                .filter((it) => it.type === "theme-toggle" || it.type === "logout")
                .map((item, idx) => {
                  if (item.type === "theme-toggle") {
                    return (
                      <button
                        key={idx}
                        onClick={() => onThemeToggle?.()}
                        className="px-3 py-1 rounded-full font-semibold"
                        style={{
                          backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
                          color: theme === "dark" ? "#000000" : "#ffffff",
                        }}
                      >
                        {theme === "dark" ? "Light" : "Dark"}
                      </button>
                    );
                  }
                  if (item.type === "logout") {
                    return (
                      <button
                        key={idx}
                        onClick={() => onLogout?.()}
                        className="px-3 py-1 rounded-full font-semibold"
                        style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
                      >
                        Logout
                      </button>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden mt-2">
            <div
              className="flex flex-col gap-2 p-3 rounded-xl shadow-md"
              style={{ backgroundColor: theme === "dark" ? "#0b0b0b" : "#ffffff" }}
            >
              {items
                .filter((it) => !it.type)
                .map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      onPillClick?.(item);
                      setMobileOpen(false);
                    }}
                    className="block w-full text-left py-3 px-4 rounded-full font-medium transition"
                    style={{
                      backgroundColor: theme === "dark" ? "#0b0b0b" : "#ffffff",
                      color: theme === "dark" ? "#ffffff" : "#000000",
                    }}
                  >
                    {item.label}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Desktop */}
        <div
          className="hidden md:flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide px-4 py-2 rounded-full mt-2"
          style={{
            backgroundColor: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.9)",
            boxShadow: theme === "dark" ? "0 6px 24px rgba(0,0,0,0.45)" : "0 6px 24px rgba(16,24,40,0.06)",
          }}
        >
          {items.map((item, i) => {
            if (item.type === "theme-toggle") {
              return (
                <button
                  key={i}
                  onClick={() => onThemeToggle?.()}
                  className="px-4 py-2 rounded-full font-semibold"
                  style={{
                    backgroundColor: theme === "dark" ? "#ffffff" : "#000000",
                    color: theme === "dark" ? "#000000" : "#ffffff",
                  }}
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
              );
            }
            if (item.type === "logout") {
              return (
                <button
                  key={i}
                  onClick={() => onLogout?.()}
                  className="px-4 py-2 rounded-full font-semibold"
                  style={{ backgroundColor: "#ef4444", color: "#fff" }}
                >
                  Logout
                </button>
              );
            }
            return renderPill(item, i);
          })}
        </div>
      </div>
    </nav>
  );
};

export default PillNav;
