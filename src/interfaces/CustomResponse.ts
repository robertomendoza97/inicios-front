export interface CustomResponse<T> {
  data: T;
  error: boolean;
  success: boolean;
}
