import API from "./api";

export const markAttendance = async (data) => {
  const res = await API.post("/attendance/", data);
  return res.data;
};

export const getAttendance = async (employeeId) => {
  const res = await API.get(`/attendance/?employee=${employeeId}`);
  return res.data;
};
