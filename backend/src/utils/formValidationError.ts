import ApiError from './apiError';

export default class FormValidationError extends ApiError {
  data: any;

  constructor(code: string, message: string, data: any) {
    super(400, 'validation_error', code, message, {});
    this.data = data;
  }

  toExternalResponse() {
    const respose = super.toExternalResponse();

    return {
      ...respose,
      data: this.data,
    };
  }
}
