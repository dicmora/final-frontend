import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

export default function ModalWithForm({
  name,
  title,
  onClose,
  isOpen,
  children,
  onSubmit,
  buttonText,
  isDisabled,
  size = "medium",
  hideDefaultButton = false,
  className,
}) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen} size={size}>
      <h2 className="modal__title">{title}</h2>

      <form
        className={`modal__form modal_size--${size} ${className || ""}`}
        onSubmit={onSubmit}
        noValidate
      >
        {children}
        {!hideDefaultButton && (
          <button
            type="submit"
            className={`modal__submit-button ${
              isDisabled ? "inactive" : "enabled"
            }`}
            disabled={isDisabled}
          >
            {buttonText || "Submit"}
          </button>
        )}
      </form>
    </Modal>
  );
}
