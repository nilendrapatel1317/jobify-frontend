"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { ShieldCheck, Terminal, Users } from "lucide-react";
import ApplyInternButton from "@/components/Internship/ApplyInternButton";

const ViewInternshipByStudent = () => {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");
  const [applicantsCount, setApplicantsCount] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);

  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [mounted, isStudentLoggedIn]);

  useEffect(() => {
    const fetchAllInternships = async () => {
      try {
        const response = await getAllInternships();
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_SUCCESS",
          payload: response.data.data
        });

        const allInternships = response.data.data || [];

        const filteredInternships = allInternships.filter(
          (internship) => internship?.id === internshipId
        );

        setInternships(filteredInternships);
        if (filteredInternships.length > 0) {
          setApplicantsCount(filteredInternships[0].students?.length || 0);
          setIsActive(filteredInternships[0]?.isActive);
        }
        setLoading(false);
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error.message
        });
        console.error("Error fetching internships:", error);
        setLoading(false);
      }
    };

    if (mounted && student?.id) {
      fetchAllInternships();
    }
  }, [mounted, student]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="student" />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center sm:text-left">
            Internship Detail
          </h1>
          <div>
            {isActive ? (
              <ApplyInternButton
                currInternship={internships[0]}
                onApply={(count) => setApplicantsCount(count)}
              />
            ) : (
              <p className="bg-gray-500/50 cursor-none select-none text-black text-xs sm:text-sm px-2 py-1 rounded-full italic">
                Application Closed !
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-base sm:text-lg text-black">Loading internships...</p>
        ) : internships.length === 0 ? (
          <p className="text-center text-red-500 text-base sm:text-lg">No internships found.</p>
        ) : (
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {internships.map((internship) => (
              <div key={internship.id}>
                {!internship?.isActive && (
                  <p className="bg-gray-500/10 mb-3 sm:mb-5 text-center cursor-none select-none text-red-500 text-sm sm:text-md px-2 py-1 italic">
                    This Internship is closed !
                  </p>
                )}
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 sm:gap-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 flex items-center gap-2 text-center sm:text-left">
                    <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8" /> {internship.profile}
                  </h2>
                  <p className="text-sm sm:text-md bg-gray-200 text-black px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                    <strong>{internship.internshipType}</strong>
                  </p>
                </div>

                <div className="text-gray-700 text-sm sm:text-base lg:text-lg space-y-3 sm:space-y-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-6 sm:mt-10">
                  <p>
                    <strong>Openings:</strong> {internship.openings}
                  </p>
                  <p>
                    <strong>From:</strong> {internship.fromDate}
                  </p>
                  <p>
                    <strong>To:</strong> {internship.toDate}
                  </p>
                  <p>
                    <strong>Duration:</strong> {internship.duration}{" "}
                    {internship.duration > 1 ? "Months" : "Month"}
                  </p>
                  <p>
                    <strong>Stipend Status:</strong> {internship.stipendStatus}
                  </p>
                  <p>
                    <strong>Stipend Amount:</strong>{" "}
                    {internship.stipendStatus === "UNPAID"
                      ? "Unpaid"
                      : `₹${internship.stipendAmount}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                      Skills Required
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {internship.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                      Your Responsibility
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {internship.responsibility?.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                      Selection Process
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {internship.assessments?.map((ass, index) => (
                        <li key={index}>{ass}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">
                      Perks
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {internship.perks?.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 sm:mt-10 flex gap-2 items-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  <p className="text-sm sm:text-md text-gray-500">
                    {applicantsCount} applicants
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewInternshipByStudent;
