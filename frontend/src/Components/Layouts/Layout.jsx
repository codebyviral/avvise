import React, { useEffect } from "react";

const Layout = ({ children }) => {
  // Function to toggle dark mode
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  };

  // Ensure the correct theme is set on page load
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div>
      <button onClick={toggleTheme} className="p-2">
        Toggle Dark Mode
      </button>
      {children}
    </div>
  );
};

export default Layout;
