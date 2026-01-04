import NewsCard from "../NewsCard/NewsCard";
import Preloader from "../Preloader/preloader";
import "./Main.css";

function Main({
  results = [],
  hasSearched = false,
  isLoading = false,
  showMore,
  setShowMore,
  onArticleSave,
  savedArticles,
}) {
  return (
    <main className="main">
      {isLoading && (
        <section className="cards">
          <Preloader />
        </section>
      )}

      {hasSearched && !isLoading && (
        <section className="cards">
          <h2 className="cards__title">Search Results</h2>

          {results.length === 0 ? (
            <div className="cards__empty-container">
              <img
                className="cards__empty-img"
                src="/not-found_v1.svg"
                alt="Not found"
              />
              <p className="cards__empty">Nothing Found</p>
              <p className="cards__empty-sorry">
                Sorry, but nothing matched your search terms
              </p>
            </div>
          ) : (
            <ul className="cards__list">
              {(showMore ? results : results.slice(0, 6)).map(
                (article, index) => (
                  <NewsCard
                    key={article._id || article.url || index}
                    article={article}
                    onArticleSave={onArticleSave}
                    savedArticles={savedArticles}
                  />
                )
              )}
            </ul>
          )}

          {results.length > 0 && (
            <div className="cards__show-more">
              <button
                className="cards__show-more-btn"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default Main;
