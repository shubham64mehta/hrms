import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }) =>   {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur border-b px-4 md:px-8 py-3 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-xl font-semibold tracking-tight">
              HRMS Lite
            </h1>
            <p className="hidden md:block text-xs text-gray-500">
              Lightweight HR management for employees and attendance.
            </p>
          </div>

          <nav className="flex items-center gap-4 text-sm">
          <Link
            to="/"
            className={`${
              pathname === "/" ? "text-black font-medium" : "text-gray-500"
            }`}
          >
            Employees
          </Link>

          <Link
            to="/attendance"
            className={`${
              pathname === "/attendance"
                ? "text-black font-medium"
                : "text-gray-500"
            }`}
          >
            Attendance
          </Link>
          </nav>
        </div>
      </header>
      <main className="p-4 md:p-8">
        <div className="max-w-5xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;