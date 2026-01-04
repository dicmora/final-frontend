import { BASE_URL, NEWS_API_BASE_URL } from "./constants";
import { isValidUrl } from "../utils/utils.js";

function checkResponse(res) {
  if (!res.ok) {
    return res.text().then((text) => {
      throw new Error(text || `Error: ${res.status}`);
    });
  }
  return res.json();
}

export function getNews(keyword) {
  const today = new Date();
  const to = today.toISOString().split("T")[0];
  const fromDate = new Date();
  fromDate.setDate(today.getDate() - 7);
  const from = fromDate.toISOString().split("T")[0];

  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  const url = `${NEWS_API_BASE_URL}?q=${encodeURIComponent(
    keyword
  )}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`;

  return fetch(url)
    .then(checkResponse)
    .then((data) => {
      const validArticles = data.articles
        .filter((article) => isValidUrl(article.url))
        .map((article) => ({
          _id: article.url,
          keyword: keyword || "news",
          title: article.title || "No title",
          text:
            article.content?.trim() ||
            article.description?.trim() ||
            "No description",
          date: article.publishedAt || new Date().toISOString(),
          source: article.source?.name || "Unknown",
          link: encodeURI(article.url),
          image: article.urlToImage,
        }));
      return validArticles;
    })
    .catch((error) => {
      console.error("Error fetching news:", error);
      return [];
    });
}

export function getSavedArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}

export function saveArticle(article, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function removeSavedArticle(articleId, token) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}
