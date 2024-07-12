import Swal from "sweetalert2";

export const useMessage = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showCloseButton: true,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen(popup) {
      popup.onmouseenter = Swal.stopTimer;
      popup.onmouseleave = Swal.resumeTimer;
    },
  });

  const error = (error) => {
    const { data, status, statusText } = error.response;
    Toast.fire({
      icon: "error",
      title: data.detail || `${status}: ${statusText}`,
    });
  };

  const success = (response) => {
    const { status, statusText } = response;
    Toast.fire({
      icon: "success",
      title: `${status}: ${statusText}`,
    });
  };

  const confirm = (title, text, action, icon = "warning") => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: "Yes, sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        action();
      }
    });
  };

  const confirmRemove = (action) => {
    confirm("Are you sure?", "You won't be able to revert this!", action);
  };

  const confirmExport = (action) => {
    confirm("Export Data", "want to export this?", action, "info");
  };

  return { success, error, confirm, confirmRemove, confirmExport };
};

export default useMessage;
