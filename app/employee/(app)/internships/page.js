"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllInternships } from "@/services/internshipService";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import ActivateDeactivateButton from "@/components/Internship/ActivateDeactivateButton";
import { Eye, Pencil, Trash2 } from "lucide-react";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state?.employee
  );

  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router?.push("/");
    }
  }, [mounted, isEmployeeLoggedIn]);

  const fetchAllInternships = async () => {
    try {
      const response = await getAllInternships();
      dispatch({
        type: "ALL_INTERNSHIPS_FETCHED_SUCCESS",
        payload: response?.data?.data
      });
      const allInternships = response?.data?.data || [];

      const filteredInternships = allInternships?.filter(
        (internship) => internship?.employee?.id === employee?.id
      );

      setInternships(filteredInternships);
    } catch (error) {
      dispatch({
        type: "ALL_INTERNSHIPS_FETCHED_FAILED",
        payload: error?.message
      });
      console?.error("Error fetching internships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchAllInternships();
    }
  }, [mounted, employee]);

  const handleStatusChange = (internshipId, newStatus) => {
    setInternships((prev) =>
      prev?.map((internship) =>
        internship?.id === internshipId
          ? { ...internship, isActive: newStatus }
          : internship
      )
    );
  };

  // Avoid hydration mismatch by only rendering after mounted
  if (!mounted) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center sm:text-left">
            Internships Added By You
          </h1>
          <Link
            href={"/employee/internships/addInternship"}
            className="w-full sm:w-auto text-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            + Add Internship
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : internships?.length === 0 ? (
          <p className="text-lg text-gray-500 italic text-center mt-20 sm:mt-40">
            No internships found! Please Add at least one internship to remove error!
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">ID</th>
                  <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">Profile</th>
                  <th className="hidden sm:table-cell py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">Openings</th>
                  <th className="hidden sm:table-cell py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">From Date</th>
                  <th className="hidden sm:table-cell py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">To Date</th>
                  <th className="hidden sm:table-cell py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">Stipend Amount</th>
                  <th className="py-3 px-2 sm:px-4 text-left text-xs sm:text-sm font-medium">Status</th>
                  <th className="py-3 px-2 sm:px-4 text-center text-xs sm:text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {internships?.map((internship) => (
                  <tr
                    key={internship?.id}
                    className={`hover:bg-gray-50 transition ${
                      internship?.isActive
                        ? ""
                        : "line-through opacity-60 text-red-500 italic font-semibold"
                    }`}
                  >
                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-black">{internship?.id}</td>
                    <td className="py-2 px-2 sm:px-4 text-xs sm:text-sm text-black text-nowrap">{internship?.profile}</td>
                    <td className="hidden sm:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm text-black">{internship?.openings}</td>
                    <td className="hidden sm:table-cell py-2 px-2 sm:px-4 text-black text-xs sm:text-sm">
                      {internship?.fromDate || "N/A"}
                    </td>
                    <td className="hidden sm:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm text-black">{internship?.toDate || "N/A"}</td>
                    <td className="hidden sm:table-cell py-2 px-2 sm:px-4 text-xs sm:text-sm text-black">
                      {internship?.stipendStatus === "UNPAID"
                        ? "Unpaid"
                        : `₹${internship?.stipendAmount}`}
                    </td>
                    <td className="py-2 px-2 sm:px-4">
                      <div className="flex flex-row gap-2 sm:gap-3 items-start sm:items-center">
                        <ActivateDeactivateButton
                          internshipId={internship?.id}
                          isActive={internship?.isActive}
                          onStatusChange={(newStatus) =>
                            handleStatusChange(internship?.id, newStatus)
                          }
                        />
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            internship?.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {internship?.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-2 sm:px-4">
                      <div className="flex justify-center items-center space-x-1 sm:space-x-2">
                        <Link
                          href={`/employee/internships/viewInternship?internshipId=${internship?.id}`}
                          className="p-1 sm:p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                        <Link
                          href={`/employee/internships/editInternship?internshipId=${internship?.id}`}
                          className={`p-1 sm:p-2 rounded-full transition-colors ${
                            !internship?.isActive
                              ? "pointer-events-none text-gray-400"
                              : "hover:bg-yellow-100 text-yellow-600"
                          }`}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                        <Link
                          href={`/employee/internships/deleteInternship?internshipId=${internship?.id}`}
                          className="p-1 sm:p-2 rounded-full transition-colors hover:bg-red-100 text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Link>
                      </div>
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

export default page;
