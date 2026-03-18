import { useState } from "react";

const EmployeeForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.employee_id || !form.name || !form.email || !form.department) {
      return alert("All fields are required");
    }
    // console.log(form);
    onAdd(form);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          placeholder="Employee ID"
          className="input"
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        />
        <input
          placeholder="Full Name"
          className="input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          className="input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Department"
          className="input"
          onChange={(e) => setForm({ ...form, department: e.target.value })}
        />

        <button className="col-span-2 bg-black text-white py-2 rounded-lg">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
