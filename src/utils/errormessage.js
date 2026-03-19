export const getErrorMessage = (error) => {
  try {
    // No error at all
    if (!error) return "Something went wrong";

    const data = error?.response?.data;

    // If axios-style response has no data, fall back to message/code
    if (data === undefined || data === null) {
      if (typeof error.message === "string" && error.message.trim()) {
        return error.message;
      }
      if (typeof error.code === "string" && error.code.trim()) {
        return error.code;
      }
      return "Something went wrong";
    }

    // If backend sent a plain string
    if (typeof data === "string") return data;

    // If backend sent an array at the root
    if (Array.isArray(data) && data.length) {
      return String(data[0]);
    }

    // If it's an object → extract first error value
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

      // Last resort – JSON-stringify complex objects
      return JSON.stringify(value);
    }

    // Fallback for any other unexpected shape
    return "Something went wrong";
  } catch {
    return "Something went wrong";
  }
};