"use client";
import React from "react";
import {
  deleteInternship,
  getAllInternships
} from "@/services/internshipService";
import { useRouter } from "next/navigation";
import { fetchAllInternships } from "@/store/Actions/internshipActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DeleteInternship = ({ internshipId }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this internship?"
    );
    if (!confirmed) return;

    try {
      await deleteInternship(internshipId);
      const response = await getAllInternships();
      dispatch({
        type: "ALL_INTERNSHIPS_FETCHED_SUCCESS",
        payload: response.data.data
      });
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.refresh();
    } catch (error) {
      console.error("Error deleting internship:", error);
      toast.error(error.response?.data?.msg || "Failed to delete internship.", {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500 px-3 py-2 rounded text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteInternship;
