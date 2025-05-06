"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";

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
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="py-3 px-2 text-left">ID</th>
                  <th className="py-3 px-2 text-left">Profile</th>
                  <th className="py-3 px-2 text-left">Openings</th>
                  <th className="py-3 px-2 text-left">From Date</th>
                  <th className="py-3 px-2 text-left">To Date</th>
                  <th className="py-3 px-2 text-left">Stipend Amount</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {internships.map((internship) => (
                  <tr
                    key={internship.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-2">{internship.id}</td>
                    <td className="py-2 px-2">{internship.profile}</td>
                    <td className="py-2 px-2">{internship.openings}</td>
                    <td className="py-2 px-2">
                      {internship.fromDate || "N/A"}
                    </td>
                    <td className="py-2 px-2">{internship.toDate || "N/A"}</td>
                    <td className="py-2 px-2">
                      {internship.stipendStatus === "UNPAID"
                        ? "Unpaid"
                        : `₹${internship.stipendAmount}`}
                    </td>
                    <td className="py-2 px-2 space-x-2 text-center">
                      <Link
                        href={`/employee/internships/editInternship?internshipId=${internship.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/employee/internships/deleteInternship?internshipId=${internship.id}`}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </Link>
                      <Link
                        href={`/employee/internships/viewInternship?internshipId=${internship.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default InternshipForm;
