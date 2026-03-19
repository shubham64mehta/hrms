import { useState } from "react";
import { useNotification } from "./notification";
import Loader from "./loader";

const EmployeeForm = ({ onAdd, loading, error }) => {
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const { notify } = useNotification();

  const validateField = (name, value) => {
    const trimmed = value.trim();

    if (!trimmed) {
      return "This field is required.";
    }

    if (name === "employee_id" && !/^\d+$/.test(trimmed)) {
      return "Employee ID must contain digits only.";
    }

    if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) {
        return "Please enter a valid email address.";
      }
    }

    return "";
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      employee_id: form.employee_id?.trim(),
      name: form.name?.trim(),
      email: form.email?.trim(),
      department: form.department?.trim(),
    };

    const nextFieldErrors = {
      employee_id: validateField("employee_id", form.employee_id),
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      department: validateField("department", form.department),
    };

    setFieldErrors(nextFieldErrors);

    const hasError = Object.values(nextFieldErrors).some(Boolean);

    if (hasError) {
      notify({
        type: "error",
        title: "Please fix the highlighted fields",
        message: "Some values are invalid or missing.",
      });
      return;
    }

    try {
      await onAdd(trimmed);
    } catch {
      // Error is handled by the mutation's onError (notification),
      // so we just prevent the promise rejection from bubbling into React.
    }
  };

  return (
    <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1">
          <input
            className={`input ${
              fieldErrors.employee_id ? "border-red-500 bg-red-50" : ""
            }`}
            placeholder="Employee ID"
            aria-invalid={fieldErrors.employee_id ? "true" : "false"}
            onChange={(e) => handleChange("employee_id", e.target.value)}
          />
          {fieldErrors.employee_id && (
            <p className="text-xs text-red-600">{fieldErrors.employee_id}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            className={`input ${fieldErrors.name ? "border-red-500 bg-red-50" : ""}`}
            placeholder="Full Name"
            aria-invalid={fieldErrors.name ? "true" : "false"}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          {fieldErrors.name && (
            <p className="text-xs text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            className={`input ${fieldErrors.email ? "border-red-500 bg-red-50" : ""}`}
            placeholder="Email"
            type="email"
            aria-invalid={fieldErrors.email ? "true" : "false"}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {fieldErrors.email && (
            <p className="text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            className={`input ${
              fieldErrors.department ? "border-red-500 bg-red-50" : ""
            }`}
            placeholder="Department"
            aria-invalid={fieldErrors.department ? "true" : "false"}
            onChange={(e) => handleChange("department", e.target.value)}
          />
          {fieldErrors.department && (
            <p className="text-xs text-red-600">
              {fieldErrors.department}
            </p>
          )}
        </div>

        <button
          disabled={loading}
          className="col-span-full btn-primary mt-2"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader size="sm" />
              <span>Adding employee...</span>
            </span>
          ) : (
            "Add Employee"
          )}
        </button>
      </form>
  );
}

export default EmployeeForm;