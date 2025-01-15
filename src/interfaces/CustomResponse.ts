export interface CustomResponse<T> {
  data: T;
  error: boolean;
  success: boolean;
  message?: string;
}

export interface ErrorCustom {
  statusCode: number;
  message: string;
  error: string;
}
