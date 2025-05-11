"use client";
import { applyJob, withdrawJob } from "@/services/jobService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const WithdrawInternButton = ({ jobId ,onWithdraw  }) => {
  const [mounted, setMounted] = useState(false);

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
      }
    }
  }, [job, student, jobId, mounted]);

  if (!mounted || !student) return null;

  const handleWithdrawIntern = async () => {
    try {
      console.log(jobId)
      console.log(student?.id)
      const response = await withdrawJob(jobId, student?.id);
      console.log(response)
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      if (onWithdraw) {
        onWithdraw(jobId); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg || "Something went wrong", {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };

  return (
    <button
      onClick={handleWithdrawIntern}
      className="bg-yellow-400 text-sm px-3 py-1 rounded-full"
    >
      Withdraw
    </button>
  );
};

export default WithdrawInternButton;
