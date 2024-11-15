import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import PackingListPage from "./pages/PackingListPage/PackingListPage";

function App() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const bodyRef = useRef(document.body);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    setUser(null); // Log out the user
    alert("You have been logged out!");
  };

  useEffect(() => {
    if (isDarkMode) {
      bodyRef.current.classList.add("dark-mode");
    } else {
      bodyRef.current.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <>
      <Header
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <Routes>
        <Route path="/" element={<HomePage isDarkMode={isDarkMode} />} />
        <Route path="/packing-list" element={<PackingListPage />} />
      </Routes>
    </>
  );
}

export default App;
