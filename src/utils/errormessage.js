export const getErrorMessage = (error) => {
  try {
    if (!error) return "Something went wrong";

    const data = error?.response?.data;
    if (data === undefined || data === null) {
      if (typeof error.message === "string" && error.message.trim()) {
        return error.message;
      }
      if (typeof error.code === "string" && error.code.trim()) {
        return error.code;
      }
      return "Something went wrong";
    }

    if (typeof data === "string") return data;
    if (Array.isArray(data) && data.length) {
      return String(data[0]);
    }

    if (typeof data === "object") {
      const keys = Object.keys(data);
      if (!keys.length) return "Something went wrong";

      const firstKey = keys[0];
      const value = data[firstKey];

      if (Array.isArray(value) && value.length) {
        return String(value[0]);
      }

      if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        return String(value);
      }

      return JSON.stringify(value);
    }

    return "Something went wrong";
  } catch {
    return "Something went wrong";
  }
};
