"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import DeleteInternship from "@/components/globle/DeleteInternship";

const InternshipForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );

  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/employee/auth/login");
    }
  }, [mounted, isEmployeeLoggedIn]);

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
          (internship) => internship.employee?.id === employee?.id
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

    if (mounted && employee?.id) {
      fetchAllInternships();
    }
  }, [mounted, employee]);

  // Avoid hydration mismatch by only rendering after mounted
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="ml-64 flex-1 p-10">
        <PathName />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Internships Added By You
          </h1>
          <Link
            href={"/employee/internships/addInternship"}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            + Add Internship
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading internships...</p>
        ) : internships.length === 0 ? (
          <p className="text-center text-red-500">No internships found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between">
                  <h2 className="text-xl font-semibold text-purple-700 mb-2">
                    {internship.profile}
                  </h2>

                  <p className="text-sm text-gray-600 mb-1">
                    <strong>ID:</strong> {internship.id}
                  </p>
                </div>

                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {internship.internshipType}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {internship.duration}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Openings:</strong> {internship.openings}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Stipend:</strong>{" "}
                  {internship.stipendStatus === "UNPAID"
                    ? "Unpaid"
                    : `₹${internship.stipendAmount}`}
                </p>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Skills Required:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {internship.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">
                    Your Responsibility:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {internship.responsibility?.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">
                    Selection Process:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {internship.assesments?.map((ass, index) => (
                      <li key={index}>{ass}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Perks:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {internship.perks?.map((perk, index) => (
                      <li key={index}>{perk}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">All Students:</p>
                  {Array.isArray(internship.students) &&
                  internship.students.length > 0 ? (
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {internship.students.map((student, index) => (
                        <li key={index}>
                          {student?.firstname || "NoFirst"}{" "}
                          {student?.lastname || "NoLast"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No students have applied yet.
                    </p>
                  )}
                </div>
                <div className="mt-5 flex gap-5 items-center">
                  <Link
                    className="bg-yellow-500 px-3 py-2 rounded text-white"
                    href={`/employee/internships/editInternship?internshipId=${internship.id}`}
                  >
                    Edit
                  </Link>
                  <DeleteInternship internshipId={internship.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default InternshipForm;
