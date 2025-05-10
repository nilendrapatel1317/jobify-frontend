"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  activateInternship,
  deactivateInternship
} from "@/services/internshipService";
import { ToggleLeft, ToggleRight } from "lucide-react";

const ActivateDeactivateButton = ({
  internshipId,
  isActive,
  onStatusChange
}) => {
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      let response;

      if (isActive) {
        response = await deactivateInternship(internshipId);
      } else {
        response = await activateInternship(internshipId);
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
