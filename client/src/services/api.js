import axios from 'axios';

const host = 'https://infinity-poll-server.vercel.app/api';
// This base URL typically specifies the root of the server's API routes and is used as a prefix when making requests to the server from the client. It allows for easy management and reuse of the server's endpoint across different parts of the client application.

// this code is defining a function called setToken that takes a token as input
export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // If the token is provided (i.e., not empty or undefined), it sets a common header for Axios requests. This header is called 'Authorization' and it includes the provided token as a bearer token. This means that when making requests to the server using Axios, this token will be sent along with the request to authenticate the client
  } else {
    delete axios.defaults.headers.common['Authorization'];
    // If the token is not provided (i.e., it's empty or undefined), it removes the 'Authorization' header from the Axios defaults. This means that subsequent requests made using Axios won't include any token for authentication.
  }
};

// This line defines an asynchronous function named call that takes three parameters:
// method: The HTTP method (e.g., 'get', 'post', 'put', 'delete') to be used for the request.
// path: The endpoint path to which the request should be made.
// data: The data payload to be sent with the request (optional)
export const call = async (method, path, data) => {
  // By using axios[method], the code is dynamically accessing the appropriate Axios method based on the value of method.
  const response = await axios[method](`${host}/${path}`, data);
  //  It constructs the URL by combining the host (which represents the base URL of the server) and the path provided to the function.
  return response.data;
  // After the request is made and the response is received, this line returns the data property of the response object
};

export default { setToken, call };
