import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ToastService = {
  success,
  error,
  info,
  warn,
  normal,
  dark
};

const options: ToastOptions = {
  position: "top-right",
  autoClose: 8000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

function success(message: string) {
  toast.success(message, options);
}

function normal(message: string) {
  toast(message, options);
}

function dark(message: string) {
  toast.dark(message, options);
}

function error(message: string) {
  toast.error(message, options);
}

function info(message: string, options: any) {
  toast.info(message, options);
}

function warn(message: string, options: any) {
  toast.warn(message, options);
}

export { ToastContainer, ToastService };
