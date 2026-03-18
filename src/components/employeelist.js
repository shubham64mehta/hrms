const EmployeeList = ({ employees = [], onDelete }) => {
  // console.log(employees);
  if (!employees.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        No employees found
      </div>
    );
  }
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Employees</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Dept</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td>{emp.employee_id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="text-red-500"
                  onClick={() => onDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
