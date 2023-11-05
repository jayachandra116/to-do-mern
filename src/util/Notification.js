// import React from "react";
import { toast } from "react-toastify";

export const handleSuccess = (message) => {
  notify("SUCCESS", message);
};

export const handleFailure = (message) => {
  notify("ERROR", message);
};

export const notify = (type, message) => {
  switch (type.toUpperCase()) {
    case "INFO": {
      toast.info(message);
      break;
    }
    case "SUCCESS": {
      toast.success(message);
      break;
    }
    case "WARNING": {
      toast.warn(message);
      break;
    }
    case "ERROR": {
      toast.error(message);
      break;
    }
    default: {
      toast(message);
    }
  }
};
