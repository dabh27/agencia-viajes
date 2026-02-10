export interface JsonResponse<T> {
  success: boolean;
  message: string;
  data: T;
}