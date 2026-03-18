// import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./Layout/layout";
import EmployeePage from "./pages/employeepage";
import AttendancePage from "./pages/attendence";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<EmployeePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
