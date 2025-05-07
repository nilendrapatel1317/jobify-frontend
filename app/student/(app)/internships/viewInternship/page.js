"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { ShieldCheck, Terminal } from "lucide-react";
import ApplyInternButton from "@/components/Internship/ApplyInternButton";

const page = () => {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");

  const router = useRouter();
  const dispatch = useDispatch();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  

  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="student" />
      <main className="ml-64 flex-1 p-10">
        <PathName />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Internship Detail
          </h1>
          <div className="flex gap-3">
            <ApplyInternButton internshipId={internshipId} />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading internships...</p>
        ) : internships.length === 0 ? (
          <p className="text-center text-red-500">No internships found.</p>
        ) : (
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
            {internships.map((internship) => (
              <div key={internship.id}>
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-purple-700 flex items-center gap-2">
                    <ShieldCheck className="w-8 h-8"/> {internship.profile}
                  </h2>
                  <p className="text-md bg-gray-200 px-3 py-1 rounded-full  ">
                    <strong>{internship.internshipType}</strong>
                  </p>
                </div>

                <div className="text-gray-700 text-lg space-y-10 grid grid-cols-1 sm:grid-cols-4 justify-between mt-10">
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
                    <strong>Duration:</strong> {internship.duration} {internship.duration > 1 ? "Months" : "Month"}
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

                <div className="flex justify-between ">
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Skills Required
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Your Responsibility
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.responsibility?.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Selection Process
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.assesments?.map((ass, index) => (
                        <li key={index}>{ass}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      Perks
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.perks?.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default page;
