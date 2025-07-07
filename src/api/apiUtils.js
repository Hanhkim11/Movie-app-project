import axios from "axios";

const api = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/",
});
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNiIsIkhldEhhblN0cmluZyI6IjA2LzAxLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc2NzY1NzYwMDAwMCIsIm5iZiI6MTc0NTM2NjQwMCwiZXhwIjoxNzY3ODMwNDAwfQ.sybvGKKtbTpgsO4tjkJrCOddpZhR6YiO6nlVCY2e4xw";
api.interceptors.request.use((config) => {
  const userLocalStorage = localStorage.getItem("userLogin");
  const currentUser = userLocalStorage ? JSON.parse(userLocalStorage) : null;

  config.headers = {
    ...config.headers,
    Authorization: currentUser ? `Bearer ${currentUser.accessToken}` : "",
    TokenCybersoft: token,
  };
  return config;
});

export default api;
