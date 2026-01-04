import "./NewsCard.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { isValidUrl } from "../../utils/utils.js";

function NewsCard({
  article,
  onArticleSave,
  onDeleteArticle,
  isSavedPage,
  savedArticles,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);

  const isSaved = currentUser
    ? savedArticles?.some((saved) => {
        if (saved.link && article.url) return saved.link === article.url;
        return saved.title?.trim() === article.title?.trim();
      })
    : false;

  function getCurrentFormattedDate() {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const handleSave = () => {
    if (!currentUser) {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 2000);
      return;
    }

    const link =
      article.url && isValidUrl(article.url) ? article.url : "https://news.com";

    const image = (() => {
      if (article.urlToImage && isValidUrl(article.urlToImage))
        return article.urlToImage;
      if (article.image && isValidUrl(article.image)) return article.image;
      return <img src="no-image.png" alt="No image available" />;
    })();

    const text = article.text?.trim() || "No description";

    const source = (article.source?.name || article.source || "Unknown").trim();

    const articleToSave = {
      keyword: article.keyword?.trim() || "news",
      title: article.title?.trim() || "No title",
      text,
      date: article.publishedAt || new Date().toISOString(),
      source,
      link,
      image,
    };

    onArticleSave(articleToSave);
  };

  const handleDelete = () => {
    if (onDeleteArticle) onDeleteArticle(article._id);
  };

  const saveButtonClassName = `card__save-button ${
    isSaved ? "card__save-button_active" : ""
  } ${!currentUser ? "card__save-button_disabled" : ""}`;

  return (
    <li className="card">
      <div
        className="card__OnClick"
        onClick={() => {
          if (!article.link) return;
          window.open(article.link, "_blank", "noopener,noreferrer");
        }}
      >
        <div className="card__image-wrapper">
          {isSavedPage && article.source && (
            <p className="card__keyword">{article.source}</p>
          )}
          <img
            className="card__image"
            src={article.image || "/fallback-image.png"}
            alt={article.title || "News image"}
            onError={(e) => (e.target.src = "/fallback-image.png")}
          />
        </div>

        <div className="card__content">
          <div className="card__text-group">
            <p className="card__date">{getCurrentFormattedDate()}</p>
            <h2 className="card__name">{article.title}</h2>

            <p className="card__description">
              {article.text && article.text !== "No description available"
                ? article.text
                : "No description available"}
            </p>
          </div>
          <div className="card__footer">{article.source}</div>
        </div>
      </div>

      {!isSavedPage && (
        <>
          <button
            className={saveButtonClassName}
            onClick={handleSave}
            aria-label="save article"
          />
          {showLoginMessage && (
            <p className="card__save-message">Sign in to save articles</p>
          )}
        </>
      )}

      {isSavedPage && (
        <>
          <button
            className="card__delete-button"
            onClick={handleDelete}
            aria-label="delete article"
            onMouseEnter={() => setShowDeleteMessage(true)}
            onMouseLeave={() => setShowDeleteMessage(false)}
          ></button>

          {showDeleteMessage && (
            <p className="card__delete-message">Remove from saved</p>
          )}
        </>
      )}
    </li>
  );
}

export default NewsCard;
