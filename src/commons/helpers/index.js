// Network error handler for axios. Handles logout on jwt expiry
export const networkErrorHandler = (error: object | Error) => {
  if (error.response) {
    /* check for jwt expiry */
    throw new Error(error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.error(error.request);
    throw new Error(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
    throw new Error(error.message);
  }
};
