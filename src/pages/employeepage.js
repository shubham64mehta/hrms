
import { getEmployees, createEmployee, deleteEmployee} from "../service/employee";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import EmployeeList from "../components/employeelist";
import EmployeeForm from "../components/employeeform";
import SectionCard from "../components/sectioncard";
import PageHeader from "../components/pageheader";
import { getErrorMessage } from "../utils/errormessage";
import { useNotification } from "../components/notification";
import Loader from "../components/loader";

const EmployeePage = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const addMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      notify({
        type: "success",
        title: "Employee created",
        message: "The employee was added successfully.",
      });
    },
    onError: (error) => {
      notify({
        type: "error",
        title: "Failed to add employee",
        message: getErrorMessage(error),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      notify({
        type: "success",
        title: "Employee deleted",
        message: "The employee record has been removed.",
      });
    },
    onError: (error) => {
      notify({
        type: "error",
        title: "Failed to delete employee",
        message: getErrorMessage(error),
      });
    },
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employee Management"
        subtitle="Maintain your organisation's employee records in one place."
      />

      <SectionCard
        title="Add Employee"
        description="Capture the core details to create a new employee record."
      >
        <EmployeeForm
          onAdd={addMutation.mutateAsync}
          loading={addMutation.isLoading}
          error={addMutation.error}
        />
      </SectionCard>

      <SectionCard
        title="Employees"
        description="Overview of all employees currently in the system."
      >
        {isLoading && (
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm mb-3">
            <Loader size="sm" />
            <span>Loading employees...</span>
          </div>
        )}

        {isError && (
          <div className="mb-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">
            Failed to fetch employees. Please try again in a moment.
          </div>
        )}

        <EmployeeList
          employees={employees}
          onDelete={deleteMutation.mutate}
        />
      </SectionCard>
    </div>
  );
}
export default EmployeePage;