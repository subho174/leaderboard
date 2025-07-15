// custom utility class to return consistent api response with statusCode, messsge and data

class ApiResponse<T> {
  constructor(
    public statusCode: number,
    public message = "Success",
    public data?: T
  ) {}
}

export default ApiResponse;
