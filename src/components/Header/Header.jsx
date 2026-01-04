import { useState, useContext } from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ setActiveModal, isLoggedIn, onSearch, handleLogout }) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className={`header ${isSavedPage ? "header__profile" : ""}`}>
      <Navigation
        isLoggedIn={isLoggedIn}
        onLoginClick={() => setActiveModal("login")}
        onSignupClick={() => setActiveModal("register")}
        onLogout={handleLogout}
      />

      {!isMenuOpen && (
        <button
          className="header__menu-icon"
          onClick={() => setIsMenuOpen(true)}
        >
          <img src="/menu.svg" alt="Menu" />
        </button>
      )}

      {isMenuOpen && (
        <>
          <div
            className="header__overlay-menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <MobileMenu
            isLoggedIn={isLoggedIn}
            setActiveModal={setActiveModal}
            handleLogout={handleLogout}
            currentUser={currentUser}
            onClose={() => setIsMenuOpen(false)}
          />
        </>
      )}

      {!isSavedPage && (
        <section className="main__login-prompt">
          <div className="main__login-text--container">
            <h1 className="main__login-text">
              {"What's going on in the world?"}
            </h1>
            <p className="main__login-subtext">
              Find the latest news on any topic and save them in your personal
              account.
            </p>
          </div>

          <div className="main__search-form">
            <SearchForm onSearch={onSearch} />
          </div>
        </section>
      )}
    </header>
  );
}

export default Header;
