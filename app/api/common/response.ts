export interface Response {
  status: boolean;
  data: {} | null;
  message: string | null;
  errors?: {};
}
