"use client";
import { applyInternship } from "@/services/internshipService";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ApplyInternButton = ({ currInternship, onApply }) => {
  const internshipId = currInternship?.id;
  const [isApplied, setIsApplied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [applicantsCount, setApplicantsCount] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const { internship } = useSelector((state) => state.internship); // assuming it's an array

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
      if (selectedInternship && Array.isArray(selectedInternship.students)) {
        const alreadyApplied = selectedInternship.students.some(
          (s) => s.id === student.id
        );
        setIsApplied(alreadyApplied);
        setApplicantsCount(currInternship?.students?.length || 0);
      }
    }
  }, [internship, student, internshipId, mounted]);

  if (!mounted || !student) return null;

  const handleApplyIntern = async () => {
    try {
      const response = await applyInternship(internshipId, student.id);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
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
        autoClose: 2000
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

export default ApplyInternButton;
