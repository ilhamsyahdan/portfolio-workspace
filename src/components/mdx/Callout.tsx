import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error";
  children: ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-blue-500 text-blue-900",
    warning: "bg-yellow-50 border-yellow-500 text-yellow-900",
    success: "bg-green-50 border-green-500 text-green-900",
    error: "bg-red-50 border-red-500 text-red-900",
  };

  const icons = {
    info: "ℹ️",
    warning: "⚠️",
    success: "✅",
    error: "❌",
  };

  return (
    <div
      className={`${styles[type]} border-l-4 p-4 my-4 rounded-r-lg`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{icons[type]}</span>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
