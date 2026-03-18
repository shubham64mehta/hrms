import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getEmployees } from "../service/employee";
import { getAttendance, markAttendance } from "../service/attendance";

const AttendancePage = () => {
  const queryClient = useQueryClient();

  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");

  // Fetch employees from the API
  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  // Fetch attendance from the API
  const { data: attendance = [] } = useQuery({
    queryKey: ["attendance", employeeId],
    queryFn: () => getAttendance(employeeId),
    enabled: !!employeeId,
  });

  // Mutation to mark attendance
  const mutation = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance", employeeId]);
    },
  });

  const handleMark = () => {
    if (!employeeId) return alert("Select employee");

    mutation.mutate({
      employee: employeeId,
      date: new Date().toISOString().split("T")[0],
      status: status,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="font-semibold">Mark Attendance</h2>

        <select
          className="input"
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
        <select className="input" onChange={(e) => setStatus(e.target.value)}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleMark}
        >
          Mark Attendance
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Attendance Records</h2>

        {!attendance.length && <p>No records found</p>}

        {attendance.map((a) => (
          <div key={a.id} className="flex justify-between border-b py-2">
            <span>{a.date}</span>
            <span>{a.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendancePage;
