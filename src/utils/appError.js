class appError extends Error {
  constructor() {
    super();
  }
  create(message, code, status) {
    this.message = message;
    this.code = code;
    this.status = status;
    return this;
  }
}

export default new appError();
