export const handleApiError = (error) => {
  let errorMessage = "";
  if (error.response) {
    const status = error.response.status;
    if (error.response.data) {
      if (error.response.data.errors) {
        errorMessage = JSON.stringify(error.response.data.errors);
      } else {
        errorMessage =
          error.response.data.title + " " + error.response.data.detail;
      }
    }
    return `${status} ${errorMessage}`;
  } else if (error.request) {
    return "No response was received";
  } else {
    return "Error: " + error.message;
  }
};
