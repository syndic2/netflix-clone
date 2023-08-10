export interface Response<T = any> {
  status: boolean;
  data: T | null;
  message: string | null;
  errors?: {};
}
