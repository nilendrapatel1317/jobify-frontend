"use client";

export const dynamic = "force-dynamic";
import React from "react";
import {
  deleteJob,
  getAllJobs
} from "@/services/jobService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Link from "next/link";

const DeleteJob = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteJob(jobId);
      const response = await getAllJobs();
      dispatch({
        type: "ALL_JOBS_FETCHED_SUCCESS",
        payload: response.data.data
      });
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/jobs");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error(error.response?.data?.msg || "Failed to delete job.", {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Deletion
        </h1>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this job? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition"
          >
            Delete
          </button>
          <Link
            href="/employee/jobs"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg shadow-sm transition"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteJob;
