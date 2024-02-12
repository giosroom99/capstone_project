// import People from "../fake/People.json";

const API_URL = "http://localhost:5000";

export const api = {
  request: async (method, url, data = null) => {
    const options = {
      method,
      headers: {},
    };

    if (data) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(data);
    }
    const response = await fetch(`${API_URL}/${url}`, options);
    let responseData;

    try {
      responseData = await response.json();
    } catch (error) {
      console.error("Non-JSON response:", response);
      return null;
    }
    return responseData;
  },
  get: (url) => api.request("GET", url),

  // make a post request to the server
  post: (url, data) => api.request("POST", url, data),
};
