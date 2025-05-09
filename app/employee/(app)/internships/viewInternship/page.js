"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { Terminal } from "lucide-react";

const InternshipForm = () => {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");

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
      router.push("/");
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

    if (mounted && employee?.id) {
      fetchAllInternships();
    }
  }, [mounted, employee]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="ml-64 flex-1 p-10">
        <PathName />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Internship Detail
          </h1>
          <div className="flex gap-3">
            <Link
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-semibold"
              href={`/employee/internships/editInternship?internshipId=${internshipId}`}
            >
              Edit
            </Link>
            <Link
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold"
              href={`/employee/internships/deleteInternship?internshipId=${internshipId}`}
            >
              Delete
            </Link>
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
                  <h2 className="text-3xl font-bold text-purple-700 flex items-top gap-2">
                    <Terminal className="text-black w-10 h-10" />{" "}
                    {internship.profile}
                  </h2>
                  <p className="text-md bg-gray-200 px-3 py-1 rounded-full  ">
                    <strong>{internship.internshipType}</strong>
                  </p>
                </div>

                <div className="text-gray-700 text-lg space-y-2 grid grid-cols-4 mt-10">
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
                    <strong>Duration:</strong> {internship.duration}
                  </p>
                  <p>
                    <strong>stipend Status:</strong> {internship.stipendStatus}
                  </p>
                  <p>
                    <strong>Stipend:</strong>{" "}
                    {internship.stipendStatus === "UNPAID"
                      ? "Unpaid"
                      : `₹${internship.stipendAmount}`}
                  </p>
                </div>

                <div className="grid grid-cols-4">
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Skills Required
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Your Responsibility
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.responsibility?.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Selection Process
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.assessments?.map((ass, index) => (
                        <li key={index}>{ass}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      Perks
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4">
                      {internship.perks?.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    All Students
                  </h3>
                  {internship.students && internship.students.length > 0 ? (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              S.No
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {internship.students.map((student, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {index + 1}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {student?.firstname || "Unknown"}{" "}
                                {student?.lastname || ""}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                {student?.email || "No email"}
                              </td>
                              <td className="px-4 py-2 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Applied
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No students have applied yet.
                    </p>
                  )}
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
