import { useNavigate } from "react-router-dom";

export default function MobileMenu({
  isLoggedIn,
  setActiveModal,
  handleLogout,
  currentUser,
  onClose,
}) {
  const navigate = useNavigate();

  return (
    <div className="header__mobile-menu">
      <div className="header__mobile-top">
        <h3 className="header__name">News Explorer</h3>

        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        />
      </div>

      <button
        className="header__home-btn"
        onClick={() => {
          navigate("/");
          onClose();
        }}
      >
        Home
      </button>

      {isLoggedIn && (
        <button
          className="header__saved-btn header__saved-btn_mobile"
          onClick={() => {
            navigate("/saved-news");
            onClose();
          }}
        >
          Saved articles
        </button>
      )}

      {isLoggedIn ? (
        <button
          className="header__logout-btn header__logout-btn_mobile"
          onClick={() => {
            handleLogout();
            onClose();
          }}
        >
          {currentUser?.name || "User"}
          <img
            src="/logout.svg"
            className="header__logout-mobile-icon"
            alt="Logout"
          />{" "}
        </button>
      ) : (
        <button
          className="header__auth-btn"
          onClick={() => {
            setActiveModal("login");
            onClose();
          }}
        >
          Sign In
        </button>
      )}
    </div>
  );
}
