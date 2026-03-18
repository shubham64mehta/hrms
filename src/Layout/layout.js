import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">HRMS Lite</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-black">
            Employees
          </Link>
          <Link to="/attendance" className="text-gray-600 hover:text-black">
            Attendance
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">{children}</div>
    </div>
  );
}
