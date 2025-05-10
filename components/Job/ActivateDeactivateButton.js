"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  activateJob,
  deactivateJob
} from "@/services/jobService";
import { ToggleLeft, ToggleRight } from "lucide-react";

const ActivateDeactivateButton = ({
  jobId,
  isActive,
  onStatusChange
}) => {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      let response;

      if (isActive) {
        response = await deactivateJob(jobId);
      } else {
        response = await activateJob(jobId);
      }

      if (response.data) {
        toast.success(response.data.msg || "Status updated successfully", {
          position: "bottom-right",
          autoClose: 2000
        });
        if (onStatusChange) {
          onStatusChange(!isActive); // Toggle the status
        }
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.msg || error.message || "Something went wrong",
        {
          position: "bottom-right",
          autoClose: 2000
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={toggleStatus} disabled={loading}>
        {isActive ? (
          <ToggleRight className="h-7 w-7 text-green-500" />
        ) : (
          <ToggleLeft className="h-7 w-7 text-gray-400" />
        )}
      </button>
    </>
  );
};

export default ActivateDeactivateButton;
