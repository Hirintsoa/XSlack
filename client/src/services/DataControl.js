/**
 * Get the correct header for protected data from the JWT token
 * @returns {Object|boolean}
 */
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return false;
    }
}