import { checkResponse } from "../utils/utils";
import { BASE_URL } from "./constants";

function request(url, { method = "GET", body, headers = {} } = {}) {
  const defaultHeaders = {};
  if (body) defaultHeaders["Content-Type"] = "application/json";

  return fetch(url, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: body ? JSON.stringify(body) : undefined,
  }).then(checkResponse);
}

export const register = ({ email, password, name }) =>
  request(`${BASE_URL}/signup`, {
    method: "POST",
    body: { email, password, name },
  });

export const authorize = ({ email, password }) =>
  request(`${BASE_URL}/signin`, { method: "POST", body: { email, password } });

export const getUserInfo = (token) =>
  fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
