import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  onSignupOpen,
  isLoading,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation(
      {
        email: "",
        password: "",
      },
      { checkEmailAvailabilityEnabled: false }
    );

  const [activeButton, setActiveButton] = useState(null);

  const isFormFilled = values.email?.trim() && values.password?.trim();

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setActiveButton(null);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!isValid) return;
    setActiveButton("login");
    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      size="small"
      hideDefaultButton={true}
      className="modal--login"
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        {errors.email && errors.email.length > 0 && (
          <span className="error">{errors.email}</span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          className="modal__input"
          value={values.password || ""}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>

      <div className="modal__button-group">
        <button
          type="submit"
          className={`modal__login-btn ${
            isFormFilled && isValid && !isLoading ? "enabled" : "inactive"
          }`}
          disabled={!isFormFilled || !isValid || isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <button
          type="button"
          className="modal__signup-btn"
          onClick={onSignupOpen}
        >
          <span>
            or <span className="modal__signup-link">Sign Up</span>
          </span>
        </button>
      </div>
    </ModalWithForm>
  );
}
