import SavedNewsSection from "../SavedNewsArticles/SavedNewsArticles";

function Profile({ savedArticles, onArticleSave, onDeleteArticle }) {
  return (
    <div className="profile">
      <section className="profile__articles">
        <SavedNewsSection
          articles={savedArticles}
          savedArticles={savedArticles}
          onArticleSave={onArticleSave}
          onDeleteArticle={onDeleteArticle}
        />
      </section>
    </div>
  );
}

export default Profile;
