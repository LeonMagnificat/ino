// fetchClient.js - A fetch-based API client that mimics axios interface

const BASE_URL = 'http://127.0.0.1:3000/';

// Helper to handle response and convert to JSON
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      response: {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      }
    };
  }
  return response.json();
};

// Create a fetch client with axios-like interface
const fetchClient = {
  // GET request
  get: async (url, config = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      signal: config.signal
    });
    
    const data = await handleResponse(response);
    return { data, status: response.status, statusText: response.statusText };
  },
  
  // POST request
  post: async (url, data = {}, config = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: JSON.stringify(data),
      signal: config.signal
    });
    
    const responseData = await handleResponse(response);
    return { data: responseData, status: response.status, statusText: response.statusText };
  },
  
  // PUT request
  put: async (url, data = {}, config = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      body: JSON.stringify(data),
      signal: config.signal
    });
    
    const responseData = await handleResponse(response);
    return { data: responseData, status: response.status, statusText: response.statusText };
  },
  
  // DELETE request
  delete: async (url, config = {}) => {
    const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers
      },
      signal: config.signal
    });
    
    const data = await handleResponse(response);
    return { data, status: response.status, statusText: response.statusText };
  }
};

export default fetchClient;

// For compatibility with existing code that expects axios
export const axios = fetchClient;