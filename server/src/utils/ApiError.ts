// custom error class to return consistent api error with statusCode and error message

class ApiError extends Error {
  constructor(
    public statusCode: number,
    public errMessage = "Something went wrong",
    public errors = []
  ) {
    super(errMessage);
  }
}

export default ApiError;
