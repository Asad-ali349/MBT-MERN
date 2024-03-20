import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.authorization = token;
  }
  return req;
});

export const POST = async (url,data) => {
  try {
    const response = await API.post(url, data);
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      error.message = error.response.data.message;
    }
    throw error.message;
    
  }
};
export const POSTFILE = async (url,data) => {
  try {
    const token = localStorage.getItem('token');
    console.log(token)
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL+url, 
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization':`${token}`,
        }
      }
    );

    return response;
  } catch (error) {
   
    if (error.response && error.response.data.message) {
      error.message = error.response.data.message;
    }
    throw error.message;
    
  }
};

export const GET = async (url) => {
  try {
    const response = await API.get(url);
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      error.message = error.response.data.message;
    }
    throw error.message;
   
  }
};

export const UPDATE = async (url,data) => {
  try {
    const response = await API.patch(url, data);
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      error.message = error.response.data.message;
    }
    throw error.message;
    
  }
};
export const DELETE = async (url) => {
  try {
    const response = await API.delete(url);
    return response;
  } catch (error) {
    if (error.response && error.response.data.message) {
      error.message = error.response.data.message;
    }
    throw error.message ;
    
    
  }
};


export const PATCHFILE = async (url,data,loading) => {
  try {
    console.log(url)
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in local storage');
    }

    console.log('Token:', token);

    const response = await axios.patch(
      process.env.REACT_APP_BACKEND_URL + url,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Adjust based on your data type
          'authorization': `${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data.message) {
      error.message = error.response.data.message;
    }
    throw error.message;
    
  }
};
