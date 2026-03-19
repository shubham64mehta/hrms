const EmployeeList = ({ employees = [], onDelete }) => {
  if (!employees.length) {
    return (
      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
        No employees yet. Add your first employee to get started.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:hidden">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {emp.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 truncate">
                  {emp.email}
                </p>
              </div>
              <button
                type="button"
                className="btn-danger-ghost shrink-0"
                onClick={() => onDelete(emp.id)}
              >
                Delete
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <p className="text-[11px] text-gray-500">Employee ID</p>
                <p className="text-sm font-medium text-gray-900">
                  {emp.employee_id}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 px-3 py-2">
                <p className="text-[11px] text-gray-500">Department</p>
                <p className="text-sm font-medium text-gray-900">
                  {emp.department}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">
                ID
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">
                Name
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">
                Email
              </th>
              <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600">
                Dept
              </th>
              <th className="px-3 py-3 text-right text-xs font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-3 text-sm text-gray-900">
                  {emp.employee_id}
                </td>
                <td className="px-3 py-3 text-sm text-gray-900">{emp.name}</td>
                <td className="px-3 py-3 text-sm text-gray-900">{emp.email}</td>
                <td className="px-3 py-3 text-sm text-gray-900">
                  {emp.department}
                </td>
                <td className="px-3 py-3 text-right">
                  <button
                    type="button"
                    className="btn-danger-ghost"
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
    </div>
  );
};

export default EmployeeList;
