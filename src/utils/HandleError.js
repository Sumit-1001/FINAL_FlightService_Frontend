export const handleError = (error) => {

  if (
    error.response &&
    error.response.data &&
    error.response.data.message
  ) {

    alert(
      error.response.data.message
    );

  } else {

    alert(
      "Something went wrong"
    );

  }
};