"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { Terminal } from "lucide-react";

const ViewInternship = () => {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");

  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );

  const [mounted, setMounted] = useState(false);
  const [currInternship, setInternships] = useState([]);
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

        setInternships(filteredInternships[0]);
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center sm:text-left">
            Internship Detail
          </h1>
          <div className="flex flex-row gap-3 sm:gap-5 items-center">
            {!currInternship?.isActive ? (
              <span className="px-3 sm:px-4 py-1 rounded-full text-sm sm:text-md font-medium bg-red-100 text-red-800 whitespace-nowrap">
                Internship Inactive
              </span>
            ) : (
              <Link
                className="w-full sm:w-auto text-center bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-semibold text-sm sm:text-base"
                href={`/employee/internships/editInternship?internshipId=${internshipId}`}
              >
                Edit
              </Link>
            )}
            
            <Link
              className="w-full sm:w-auto text-center bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-semibold text-sm sm:text-base"
              href={`/employee/internships/deleteInternship?internshipId=${internshipId}`}
            >
              Delete
            </Link>
          </div>
        </div>

        {loading ? (
          <p className="text-center text-base sm:text-lg">Loading internships...</p>
        ) : currInternship.length === 0 ? (
          <p className="text-center text-red-500 text-base sm:text-lg">No internships found.</p>
        ) : (
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            {currInternship && (
              <div key={currInternship?.id}>
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-3 sm:gap-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-700 flex items-center gap-2 text-center sm:text-left">
                    <Terminal className="text-black w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />{" "}
                    {currInternship?.profile}
                  </h2>
                  <p className="text-sm sm:text-md text-black bg-gray-200 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                    <strong>{currInternship?.internshipType}</strong>
                  </p>
                </div>

                <div className="text-gray-700 text-sm sm:text-base lg:text-lg space-y-3 sm:space-y-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mt-6 sm:mt-10">
                  <p>
                    <strong>Openings:</strong> {currInternship?.openings}
                  </p>
                  <p>
                    <strong>From:</strong> {currInternship?.fromDate}
                  </p>
                  <p>
                    <strong>To:</strong> {currInternship?.toDate}
                  </p>
                  <p>
                    <strong>Duration:</strong> {currInternship?.duration}
                  </p>
                  <p>
                    <strong>stipend Status:</strong>{" "}
                    {currInternship?.stipendStatus}
                  </p>
                  <p>
                    <strong>Stipend:</strong>{" "}
                    {currInternship?.stipendStatus === "UNPAID"
                      ? "Unpaid"
                      : `₹${currInternship?.stipendAmount}`}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                      Skills Required
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {currInternship?.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                      Your Responsibility
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {currInternship?.responsibility?.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                      Selection Process
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {currInternship?.assessments?.map((ass, index) => (
                        <li key={index}>{ass}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
                      Perks
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-2 sm:ml-4 text-sm sm:text-base">
                      {currInternship?.perks?.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                    All Students
                  </h3>
                  {currInternship?.students &&
                  currInternship?.students.length > 0 ? (
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                              S.No
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Contact
                            </th>
                            <th className="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                              City
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-black" >
                          {currInternship?.students.map((student, index) => (
                            <tr key={student.id}>
                              <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm sm:text-base">
                                {index + 1}
                              </td>
                              <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm sm:text-base">
                                {student.firstname} {student.lastname}
                              </td>
                              <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm sm:text-base">
                                {student.email}
                              </td>
                              <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm sm:text-base">
                                {student.contact}
                              </td>
                              <td className="px-3 sm:px-4 py-2 whitespace-nowrap text-sm sm:text-base">
                                {student.city}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 text-sm sm:text-base italic">
                      No students have applied yet.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewInternship;
