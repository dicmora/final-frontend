import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header.jsx";
import Profile from "../Profile/Profile.jsx";
import Main from "../Main/Main";
import { isValidUrl } from "../../utils/utils.js";
import { BASE_URL } from "../../utils/constants";
import RegisterModal from "../RegistrationModal/RegistrationModal";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../ProtectedRoute";
import * as auth from "../../utils/auth.js";
import {
  getNews,
  getSavedArticles,
  saveArticle,
  removeSavedArticle,
} from "../../utils/api.js";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [articles, setArticles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const openModal = (type) => setActiveModal(type);
  const closeActiveModal = () => setActiveModal("");
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .getUserInfo(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
          return getSavedArticles(token);
        })
        .then((saved) => {
          // setSavedArticles(saved);
          setSavedArticles([...saved].reverse());
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      getNews("news")
        .then((news) => setArticles(news))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (!activeModal) return;
    const handleEsc = (evt) => evt.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  const handleSearch = (query) => {
    setIsLoading(true);
    setHasSearched(true);

    const cleaned = query.trim();
    if (!cleaned) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const token = localStorage.getItem("jwtToken");
      const fetchResults = token
        ? fetch(`${BASE_URL}/news/search?q=${encodeURIComponent(cleaned)}`, {
            headers: {},
          }).then((res) => {
            if (!res.ok) throw new Error("No news found");
            return res.json();
          })
        : getNews(cleaned).then((data) =>
            data.filter((article) => article.link && article.link !== "#")
          );

      fetchResults
        .then((dataset) => {
          const normalized = dataset.map((n, index) => {
            const text =
              n.content?.trim() ||
              n.description?.trim() ||
              "No description available";

            const source = (n.source?.name || n.source || "Unknown").trim();

            return {
              _id: n.url || `article-${index}`,
              title: n.title || "No title",
              text: n.text,
              date: n.publishedAt || new Date().toISOString(),
              source: source || "Unknown",
              link: n.url || "#",
              image: n.urlToImage || n.image || "/fallback-image.png",
            };
          });

          setSearchResults(normalized);
        })
        .catch(() => setSearchResults([]))
        .finally(() => setIsLoading(false));
    }, 1000);
  };

  const handleArticleSave = (article) => {
    if (!currentUser) return;

    const token = localStorage.getItem("jwt");
    if (!token) {
      console.error("No auth token found");
      return;
    }

    saveArticle(article, token)
      .then((saved) => {
        setSavedArticles((prev) => [saved, ...prev]);
      })
      .catch((err) => {
        console.error("Failed to save article:", err);
      });
  };

  const handleArticleDelete = (id) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    removeSavedArticle(id, token)
      .then((res) => {
        setSavedArticles((prev) => {
          const next = prev.filter((a) => a._id !== id);
          return next;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegistration = ({ name, email, password }) => {
    return auth
      .register({ name, email, password })
      .then(() => auth.authorize({ email, password }))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return auth.getUserInfo(data.token).then((userData) => {
            setCurrentUser(userData);
            setIsLoggedIn(true);
          });
        } else {
          return Promise.reject("No token received");
        }
      })
      .catch((err) => console.error("Registration error:", err));
  };

  const handleLogin = ({ email, password }) => {
    setLoginError("");
    setIsLoading(true);

    return auth
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return auth.getUserInfo(data.token);
        } else {
          return Promise.reject({ message: "No token received" });
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        setLoginError(err.message || "Invalid email or password");
      })
      .finally(() => setIsLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <Header
            setActiveModal={setActiveModal}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            onSearch={handleSearch}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  results={searchResults}
                  hasSearched={hasSearched}
                  isLoading={isLoading}
                  showMore={showMore}
                  setShowMore={setShowMore}
                  onArticleSave={handleArticleSave}
                  savedArticles={savedArticles}
                />
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  onAuthRequired={() => setActiveModal("login")}
                >
                  <Profile
                    articles={articles}
                    savedArticles={savedArticles}
                    onArticleSave={handleArticleSave}
                    onDeleteArticle={handleArticleDelete}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegistration}
            onLoginOpen={() => setActiveModal("login")}
            isLoading={isLoading}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSignupOpen={() => setActiveModal("register")}
            isLoading={isLoading}
          />

          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
