"use client";

import { applyJob } from "@/services/jobService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ApplyJobButton = ({ currJob, onApply }) => {
  const jobId = currJob?.id;
  const [isApplied, setIsApplied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [applicantsCount, setApplicantsCount] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const { job } = useSelector((state) => state.job); // assuming it's an array

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted]);

  useEffect(() => {
    if (mounted && student && jobId && Array.isArray(job)) {
      const selectedJob = job.find(
        (item) => item.id === jobId
      );
      if (selectedJob && Array.isArray(selectedJob.students)) {
        const alreadyApplied = selectedJob.students.some(
          (s) => s.id === student.id
        );
        setIsApplied(alreadyApplied);
        setApplicantsCount(currJob?.students?.length || 0);
      }
    }
  }, [job, student, jobId, mounted]);

  if (!mounted || !student) return null;

  const handleApplyIntern = async () => {
    try {
      const response = await applyJob(jobId, student.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000,
      });
      setIsApplied(true);
      
      const newCount = applicantsCount + 1;
      setApplicantsCount(newCount);

      if (onApply) {
        onApply(newCount);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        position: "bottom-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="flex gap-3">
      {isApplied ? (
        <p className="bg-green-500 px-4 py-2 rounded text-white font-semibold">
          Applied
        </p>
      ) : (
        <button
          onClick={handleApplyIntern}
          className="bg-blue-500 px-4 py-2 rounded text-white font-semibold"
        >
          Apply Now
        </button>
      )}
    </div>
  );
};

export default ApplyJobButton;
