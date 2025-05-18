"use client";
import { applyInternship, withdrawInternship } from "@/services/internshipService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const WithdrawInternButton = ({ internshipId ,onWithdraw  }) => {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const { internship } = useSelector((state) => state.internship); // assuming it's an array
  const [currInternship, setCurrInternship] = useState(null)

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted]);

  useEffect(() => {
    if (mounted && student && internshipId && Array.isArray(internship)) {
      const selectedInternship = internship.find(
        (item) => item.id === internshipId
      );
      setCurrInternship(selectedInternship);
      if (selectedInternship && Array.isArray(selectedInternship.students)) {
        const alreadyApplied = selectedInternship.students.some(
          (s) => s.id === student.id
        );
      }
    }
  }, [internship, student, internshipId, mounted]);

  if (!mounted || !student) return null;

  const handleWithdrawIntern = async () => {
    try {
      const response = await withdrawInternship(internshipId, student?.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      if (onWithdraw) {
        onWithdraw(internshipId); 
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
      className={` text-sm px-3 py-1 rounded-full ${!currInternship?.isActive ? "pointer-events-none bg-yellow-400/50 text-black/50 line-through" : "bg-yellow-400"}`}
    >
      Withdraw
    </button>
  );
};

export default WithdrawInternButton;
