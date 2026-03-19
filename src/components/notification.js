import { createContext, useCallback, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return ctx;
};

const NotificationContainer = ({ notifications, onClose }) => {
  if (!notifications.length) return null;

  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 pointer-events-none">
      <div className="w-full max-w-md space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur bg-white/95 ${
              n.type === "error"
                ? "border-red-200"
                : "border-emerald-200"
            }`}
          >
            <div
              className={`mt-0.5 h-2 w-2 rounded-full ${
                n.type === "error" ? "bg-red-500" : "bg-emerald-500"
              }`}
            />
            <div className="flex-1">
              {n.title && (
                <p className="text-sm font-semibold text-gray-900">
                  {n.title}
                </p>
              )}
              <p className="text-sm text-gray-700">{n.message}</p>
            </div>
            <button
              onClick={() => onClose(n.id)}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((payload) => {
    const id = Date.now() + Math.random();
    const next = {
      id,
      type: payload.type || "success",
      title: payload.title,
      message: payload.message || "",
    };

    setNotifications((prev) => [...prev, next]);

    const timeout = payload.duration ?? 3000;
    if (timeout > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, timeout);
    }
  }, []);

  const close = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <NotificationContainer notifications={notifications} onClose={close} />
    </NotificationContext.Provider>
  );
};

