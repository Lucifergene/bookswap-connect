import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

export type AlertMessageProps = {
  type: "error" | "success";
  message: string;
};

export const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
}) => {
  const isError = type === "error";
  const Icon = isError ? XCircleIcon : CheckCircleIcon;
  const iconColor = isError ? "text-red-400" : "text-green-400";
  const textColor = isError ? "text-red-800" : "text-green-800";
  const bgColor = isError ? "bg-red-50" : "bg-green-50";

  return (
    <div className={`rounded-md ${bgColor} p-4 `}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${textColor}`}>{message}</h3>
        </div>
      </div>
    </div>
  );
};
