import { Link, useLocation } from "react-router-dom";

const MainLayout = ({ children }) =>   {
  const { pathname } = useLocation();

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100
        before:absolute before:inset-0
        before:bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.07),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(2,132,199,0.05),transparent_60%)]
        before:pointer-events-none before:content-['']"
    >
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

          <nav className="flex items-center gap-2 text-sm">
            <Link
              to="/"
              className={`rounded-lg px-3 py-2 transition ${
                pathname === "/"
                  ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
              }`}
            >
              Employees
            </Link>

            <Link
              to="/attendance"
              className={`rounded-lg px-3 py-2 transition ${
                pathname === "/attendance"
                  ? "bg-slate-900 text-white shadow-sm hover:bg-slate-800"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
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