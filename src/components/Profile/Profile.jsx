import React, { useContext } from "react";
import SavedNewsSection from "../SavedNewsArticles/SavedNewsArticles";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({ savedArticles, onArticleSave, onDeleteArticle }) {
  const currentUser = useContext(CurrentUserContext);

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
