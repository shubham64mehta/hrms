import EmployeeForm from "../components/employeeform";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
} from "../service/employee";
import EmployeeList from "../components/employeelist";

const EmployeePage = () => {
  const queryClient = useQueryClient();
  //fetching employees from the API
  const {
    data: employees = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  //Adding employees to the API
  const addEmployeeMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  //Deleting employees from the API
  const deleteEmployeeMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });


  const getErrorMessage = (error) => {
    return (
      error?.response?.data?.employee_id?.[0] ||
      error?.response?.data?.email?.[0] ||
      error?.response?.data?.non_field_errors?.[0] ||
      "Something went wrong"
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <EmployeeForm onAdd={addEmployeeMutation.mutate} />
      {isLoading && <div>Loading...</div>}
      {isError && <div className="text-red-500">Error fetching employees</div>}
      {addEmployeeMutation.isError && (
        <div className="text-red-500">
          {getErrorMessage(addEmployeeMutation.error)}
        </div>
      )}
      {addEmployeeMutation.isSuccess && (
        <div className="text-green-600">Employee added successfully</div>
      )}
      {deleteEmployeeMutation.isError && (
        <div className="text-red-500">
          {getErrorMessage(deleteEmployeeMutation.error)}
        </div>
      )}
      {deleteEmployeeMutation.isSuccess && (
        <div className="text-green-600">Employee deleted successfully</div>
      )}
      <EmployeeList
        employees={employees}
        onDelete={deleteEmployeeMutation.mutate}
      />
    </div>
  );
};

export default EmployeePage;
