"use client";
import React from "react";
import { deleteInternship } from "@/services/internshipService";
import { useRouter } from "next/navigation";

const DeleteInternship = ({ internshipId }) => {
  console.log(internshipId)
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this internship?"
    );
    if (!confirmed) return;

    try {
      await deleteInternship(internshipId);
      alert("Internship deleted successfully!");
      router.push("/employee/internships");
    } catch (error) {
      console.error("Error deleting internship:", error);
      alert("Failed to delete internship.");
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
