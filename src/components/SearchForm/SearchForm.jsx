import { useState } from "react";
import "../ModalWithForm/ModalWithForm.css";

function SearchForm({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = inputValue.trim();

    if (!query) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-form__input"
        type="text"
        placeholder="Search news..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="search-form__btn" type="submit">
        Search
      </button>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
}

export default SearchForm;
