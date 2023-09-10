export default class ApiError extends Error {
  /**
   * basic Erorr class
   * @param status http code to represent the error
   * @param type Error type e.g, InTransactionError
   * @param code Code to elaborate Type error e.g: room_not_found
   * @param message Human readble message about the error
   * @param meta more information about the error. E.g: attach raw.
   */
  status: number;
  type: string;
  code: string;
  constructor(status: number, type: string, code: string, message: string) {
    super(message);
    this.status = status;
    this.type = type;
    this.code = code;
  }

  toExternalResponse() {
    return {
      status: this.status,
      type: this.type,
      message: this.message,
      code: this.code,
    };
  }
}
