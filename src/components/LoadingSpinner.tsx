import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="animate-spin text-slate-600" />
    </div>
  );
};

export default LoadingSpinner;
