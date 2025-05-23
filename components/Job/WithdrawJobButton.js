"use client";

import { withdrawJob } from "@/services/jobService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const WithdrawInternButton = ({ jobId, onWithdraw }) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const { job } = useSelector((state) => state.job); // assuming it's an array
  const [currJob, setCurrJob] = useState(null);

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
      const selectedJob = job.find((item) => item.id === jobId);
      setCurrJob(selectedJob);
      if (selectedJob && Array.isArray(selectedJob.students)) {
        const alreadyApplied = selectedJob.students.some(
          (s) => s.id === student.id
        );
      }
    }
  }, [job, student, jobId, mounted]);

  if (!mounted || !student) return null;

  const handleWithdrawIntern = async () => {
    try {
      
      const response = await withdrawJob(jobId, student?.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      if (onWithdraw) {
        onWithdraw(jobId);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };

  return (
    <button
      onClick={handleWithdrawIntern}
      className={` text-sm px-3 py-1 rounded-full ${
        !currJob?.isActive
          ? "pointer-events-none bg-yellow-400/50 text-black/50 line-through"
          : "bg-yellow-400"
      }`}
    >
      Withdraw
    </button>
  );
};

export default WithdrawInternButton;
