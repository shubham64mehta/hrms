const Loader = ({ size = "sm" }) => {
  const dimension = size === "lg" ? "h-6 w-6" : size === "md" ? "h-5 w-5" : "h-4 w-4";

  return (
    <span
      className={`inline-block ${dimension} animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 align-middle`}
      aria-hidden="true"
    />
  );
};

export default Loader;

