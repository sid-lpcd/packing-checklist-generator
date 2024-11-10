import "./Header.scss";

const Header = ({ user, onLogout, isDarkMode, toggleTheme }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h2>Packing List Generator</h2>
        <div>
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
              <button onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div className="header__auth-buttons">
              <button onClick={() => alert("Login functionality coming soon!")}>
                Login
              </button>
              <button
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
