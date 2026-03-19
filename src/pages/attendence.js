import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees } from "../service/employee";
import { getAttendance, markAttendance } from "../service/attendance";
import { getErrorMessage } from "../utils/errormessage";
import { useNotification } from "../components/notification";
import Loader from "../components/loader";
import SectionCard from "../components/sectioncard";
import PageHeader from "../components/pageheader";

export default function AttendancePage() {
  const queryClient = useQueryClient();
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("Present");
  const { notify } = useNotification();

  const {
    data: employees = [],
    isLoading: employeesLoading,
    isError: employeesError,
    error: employeesErrorObj,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const {
    data: attendance = [],
    isLoading: attendanceLoading,
    isError: attendanceError,
    error: attendanceErrorObj,
  } = useQuery({
    queryKey: ["attendance", employeeId],
    queryFn: () => getAttendance(employeeId),
    enabled: !!employeeId,
  });

  const mutation = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries(["attendance", employeeId]);
      notify({
        type: "success",
        title: "Attendance marked",
        message: "Attendance has been recorded for today.",
      });
    },
    onError: (error) => {
      notify({
        type: "error",
        title: "Failed to mark attendance",
        message: getErrorMessage(error),
      });
    },
  });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendance"
        subtitle="Mark daily presence and review an employee's attendance history."
      />

      <SectionCard
        title="Mark Attendance"
        description="Choose an employee and set their status for today."
      >
        <div className="space-y-3">
          {employeesLoading && (
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <Loader size="sm" />
              <span>Loading employees...</span>
            </div>
          )}

          {employeesError && (
            <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
              {getErrorMessage(employeesErrorObj)}
            </div>
          )}

          <select
            className="input"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Status:</span>
            <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                className={`btn-chip ${
                  status === "Present"
                    ? "btn-chip-active-present"
                    : "btn-chip-inactive"
                }`}
                onClick={() => setStatus("Present")}
              >
                Present
              </button>
              <button
                type="button"
                className={`btn-chip ${
                  status === "Absent"
                    ? "btn-chip-active-absent"
                    : "btn-chip-inactive"
                }`}
                onClick={() => setStatus("Absent")}
              >
                Absent
              </button>
            </div>
          </div>

          <button
            className="w-full btn-primary"
            disabled={mutation.isLoading || !employeeId}
            onClick={() =>
              mutation.mutate({
                employee: employeeId,
                date: new Date().toISOString().split("T")[0],
                status,
              })
            }>
            {mutation.isLoading ? (
              <span className="inline-flex items-center gap-2">
                <Loader size="sm" />
                <span>Marking...</span>
              </span>
            ) : (
              `Mark ${status}`
            )}
          </button>
        </div>
      </SectionCard>

      <SectionCard
        title="Attendance Records"
        description="Recent attendance entries for the selected employee."
      >
        {attendanceLoading && (
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <Loader size="sm" />
            <span>Loading attendance...</span>
          </div>
        )}

        {attendanceError && (
          <div className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            {getErrorMessage(attendanceErrorObj)}
          </div>
        )}

        {!attendanceLoading && !attendance.length && employeeId && (
          <p className="text-gray-500 text-center py-4">
            No records found for this employee.
          </p>
        )}

        {!employeeId && (
          <p className="text-gray-500 text-center py-4 text-sm">
            Select an employee above to view their attendance records.
          </p>
        )}

        <div className="space-y-3">
          {attendance.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">{a.date}</p>
                <p className="text-xs text-gray-500">Recorded status</p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  a.status === "Present"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}