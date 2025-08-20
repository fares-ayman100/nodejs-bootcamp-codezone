class AppError extends Error {
  constructor() {
    super();
  }
  create(statusText, message, statusCode) {
    this.statusText = statusText;
    this.message = message;
    this.statusCode = statusCode;
    return this;
  }
}
module.exports = new AppError();
