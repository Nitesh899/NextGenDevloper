import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong."
): string {
  if (
    axios.isAxiosError(error)
  ) {
    const data = error.response?.data;

    if (typeof data?.message === "string") {
      return data.message;
    }

    if (
      data?.errors &&
      typeof data.errors === "object"
    ) {
      const firstError =
        Object.values(data.errors)
          .flat()
          .find(
            (value) =>
              typeof value === "string"
          );

      if (firstError) {
        return String(firstError);
      }
    }

    if (
      typeof data?.detail === "string"
    ) {
      return data.detail;
    }

    if (error.message) {
      return error.message;
    }
  }

  return fallback;
}