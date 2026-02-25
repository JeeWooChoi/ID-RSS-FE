import axios from "axios";

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? "오류가 발생했습니다.";
  }
  return "오류가 발생했습니다.";
};
