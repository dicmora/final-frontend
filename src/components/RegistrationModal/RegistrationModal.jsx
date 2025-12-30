import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function RegisterModal({
  isOpen,
  onClose,
  onRegister,
  onLoginOpen,
  isLoading,
  showSignIn = false,
}) {
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    values,
    handleChange,
    errors,
    warnings,
    isValid,
    checkingEmail,
    resetForm,
  } = useFormAndValidation(
    { email: "", password: "", name: "" },
    { checkEmailAvailabilityEnabled: true }
  );

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setIsRegistered(false);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!isValid) return;

    try {
      await onRegister(values);
      setIsRegistered(true);
    } catch (err) {
      console.error(err);
    }
  };

  const isFormFilled =
    values.email?.trim() && values.password?.trim() && values.name?.trim();

  const modalSize = isRegistered ? "tiny" : showSignIn ? "small" : "medium";

  return (
    <ModalWithForm
      title={isRegistered ? "" : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      size={modalSize}
      hideDefaultButton={true}
      className="modal--signup"
    >
      {!isRegistered ? (
        <>
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
          </label>
          {errors.email && <span className="error">{errors.email}</span>}
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

          <label className="modal__label">
            Username
            <input
              type="text"
              name="name"
              className="modal__input"
              value={values.name || ""}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </label>

          {warnings.email && <span className="warning">{warnings.email}</span>}
          <div className="modal__button-group">
            <button
              type="submit"
              className={`modal__login-btn ${
                isFormFilled && isValid && !isLoading ? "enabled" : "inactive"
              }`}
              disabled={!isFormFilled || !isValid || isLoading || checkingEmail}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>

            <button
              type="button"
              className="modal__signup-btn"
              onClick={onLoginOpen}
            >
              <span>
                or <span className="modal__signup-link">Log In</span>
              </span>
            </button>
          </div>
        </>
      ) : (
        <div className="modal__success">
          <p className="modal__success-title">
            Registration successfully Completed!
          </p>
          <button className="modal__signup-link" onClick={onLoginOpen}>
            Sign In
          </button>
        </div>
      )}
    </ModalWithForm>
  );
}
