const EmployeeList = ({ employees = [], onDelete }) => {
  if (!employees.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
        No employees yet. Add your first employee to get started.
      </div>
    );
  }

  return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Dept</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{emp.employee_id}</td>
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.email}</td>
                <td className="p-2">{emp.department}</td>
                <td className="p-2">
                  <button
                    className="text-red-500 hover:underline"
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
}

export default EmployeeList;