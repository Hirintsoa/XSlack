import axios from "axios";

const API_URL = "http://localhost:8000";
/**
 * Validate registration of a new user
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns {void}
 */
const register = (username, email, password) => {
  return axios.post(API_URL + "/register", {
    username,
    email,
    password,
  });
};

/**
 * Log in with username & password
 * @param {string} username 
 * @param {string} password 
 * @returns {JSON} User Info & Access token
 */
const login = async (username, password) => {
  const res = await axios
        .post(API_URL + "/authenticate", {
            username,
            password,
        });
    if (res.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
};

/**
 * Session ending
 */
const logout = () => {
  localStorage.removeItem("user");
};

/**
 * Retrieve the stored user info & token
 * @returns {Object} User Info & Access token
 */
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};