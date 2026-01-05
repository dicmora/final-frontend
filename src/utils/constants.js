const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.dailynews.mysaol.com"
    : "http://localhost:3001";

export { BASE_URL };

export const NEWS_API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";
