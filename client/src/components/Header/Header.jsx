import { Link } from "react-router-dom";
import "./Header.scss";

const Header = ({ user, onLogout, isDarkMode, toggleTheme }) => {
  return (
    <header className={`header ${isDarkMode ? "dark" : ""}`}>
      <div className="header-container">
        <Link to="/" className="header__link">
          <h2 className="header__title">Packing List Generator</h2>
        </Link>
        <div className="header__user">
          <div
            className={`header__toggle-container ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            <button
              className={`header__toggle-button ${
                isDarkMode ? "dark" : "light"
              }`}
              onClick={toggleTheme}
            >
              <span
                className={`header__toggle-circle ${
                  isDarkMode ? "dark" : "light"
                }`}
              ></span>
            </button>
            <span className="header__mode-text">
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </span>
          </div>

          {user ? (
            <div className="header__user-info">
              <span>Welcome, {user.name}</span>
              <button
                className={`header__logout ${isDarkMode ? "dark" : "light"}`}
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="header__auth-buttons">
              <button
                className={`header__login ${isDarkMode ? "dark" : "light"}`}
                onClick={() => alert("Login functionality coming soon!")}
              >
                Login
              </button>
              <button
                className={`header__sign-up ${isDarkMode ? "dark" : "light"}`}
                onClick={() => alert("Signup functionality coming soon!")}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
