import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../Header/Header.css";

function Navigation({ isLoggedIn, onLoginClick, onSignupClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";

  return (
    <div className="header__top">
      <h3 className="header__name">News Explorer</h3>

      <button className="header__home-btn" onClick={() => navigate("/")}>
        Home
      </button>

      {isLoggedIn ? (
        <>
          <Link to="/saved-news" className="header__saved-link">
            <button
              type="button"
              className={`header__saved-btn ${
                isSavedPage
                  ? "header__saved-btn_white"
                  : "header__saved-btn_transparent"
              }`}
            >
              Saved articles
            </button>
          </Link>

          <div className="header__user-container">
            <p className="header__username">{currentUser?.name || "User"}</p>
            <button onClick={onLogout} className="header__logout-btn">
              <img
                src="/logout.svg"
                className="header__logout-icon"
                alt="Logout"
              />
            </button>
          </div>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button onClick={onLoginClick} className="header__auth-btn">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Navigation;
