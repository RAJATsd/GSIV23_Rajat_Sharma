const apiUrl = (url) =>
  `${url}&api_key=${process.env.NEXT_PUBLIC_MOVIE_DB_API_KEY}`;

export default apiUrl;
