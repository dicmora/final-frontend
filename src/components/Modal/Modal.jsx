import useModalClose from "../../hooks/useModalClose";

export const Modal = ({ name, onClose, isOpen, children, size = "medium" }) => {
  useModalClose(isOpen, onClose);

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
    >
      <div className={`modal__content modal__content--${size} `}>
        {children}
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close"
        />
      </div>
    </div>
  );
};
