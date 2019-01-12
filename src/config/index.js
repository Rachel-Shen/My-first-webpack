let baseURL;

if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://www.yhb118.com'
} else if (process.env.NODE_ENV === 'development') {
  baseURL = 'https://www.yhb118.com'
}

export default baseURL

