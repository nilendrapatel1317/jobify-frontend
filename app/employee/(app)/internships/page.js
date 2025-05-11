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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : internships?.length === 0 ? (
          <p className="text-lg text-gray-500 italic mb-4 mt-60 text-center">
            No internships found ! Please Add at least one internship to remove error !
          </p>
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
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {internships?.map((internship) => (
                  <tr
                    key={internship?.id}
                    className={`border-t border-black hover:bg-gray-50 transition ${
                      internship?.isActive
                        ? ""
                        : "line-through opacity-60 text-red-500 italic font-semibold"
                    }`}
                  >
                    <td className="py-2 px-2">{internship?.id}</td>
                    <td className="py-2 px-2">{internship?.profile}</td>
                    <td className="py-2 px-2">{internship?.openings}</td>
                    <td className="py-2 px-2">
                      {internship?.fromDate || "N/A"}
                    </td>
                    <td className="py-2 px-2">{internship?.toDate || "N/A"}</td>
                    <td className="py-2 px-2">
                      {internship?.stipendStatus === "UNPAID"
                        ? "Unpaid"
                        : `₹${internship?.stipendAmount}`}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-3 items-center">
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

                    <td className="py-2 px-2 space-x-2 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <Link
                          href={`/employee/internships/viewInternship?internshipId=${internship?.id}`}
                          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye className="h-6 w-6" />
                        </Link>
                        <Link
                          href={`/employee/internships/editInternship?internshipId=${internship?.id}`}
                          className={`p-2 rounded-full  transition-colors ${
                            !internship?.isActive
                              ? "pointer-events-none text-gray-400 "
                              : "hover:bg-yellow-100 text-yellow-600"
                          }`}
                          title="Edit"
                        >
                          <Pencil className="h-6 w-6" />
                        </Link>
                        <Link
                          href={`/employee/internships/deleteInternship?internshipId=${internship?.id}`}
                          className="p-2 rounded-full  transition-colors hover:bg-red-100 text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-6 w-6" />
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
