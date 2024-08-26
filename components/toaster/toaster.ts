import toast from "react-hot-toast";

type Toaster = {
  success: (message: string) => void;
  error: (message: string) => void;
};

const toaster: Toaster = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
};

export default toaster;
