import { useContext } from "react";
import NewsCard from "../NewsCard/NewsCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SavedNewsArticles.css";

function SavedNewsArticles({
  articles,
  savedArticles,
  onArticleSave,
  onDeleteArticle,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userArticles = savedArticles.filter(
    (a) => String(a.owner?._id || a.owner) === String(currentUser?._id)
  );

  const keywords = [...new Set(userArticles.map((a) => a.source))];

  return (
    <div className="savednews__section">
      <div className="savednews__header">
        <p className="savednews__title">Saved articles</p>

        <p className="savednews__count">
          {currentUser?.name || "User"}, you have {userArticles.length} saved
          articles
        </p>

        <p className="savednews__keywords">
          By keywords:{" "}
          <strong>
            {keywords[0]}
            {keywords.length > 1 && `, ${keywords[1]}`}
            {keywords.length === 3 && `, and 1 other`}
            {keywords.length > 3 && `, and ${keywords.length - 2} others`}
          </strong>
        </p>
      </div>

      <div className="savednews__list-wrapper">
        <ul className="savednews__list">
          {articles
            .filter((article) => article.link && article.link !== "#")
            .map((article) => (
              <NewsCard
                key={article._id || article.link}
                article={article}
                onArticleSave={onArticleSave}
                onDeleteArticle={onDeleteArticle}
                isSavedPage={true}
                savedArticles={savedArticles}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default SavedNewsArticles;
