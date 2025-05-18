"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { toast } from "react-toastify";
import { deleteInternship } from "@/services/internshipService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle } from "lucide-react";

const DeleteInternship = () => {
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");

  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector((state) => state.employee);
  const { internship } = useSelector((state) => state.internship);
  const selectedInternship = internship?.find((i) => i.id === internshipId);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEmployeeLoggedIn) {
      router.push("/");
    }
  }, [isEmployeeLoggedIn, mounted]);

  if (!mounted || !employee || !selectedInternship) return null;

  const handleDelete = async () => {
    try {
      const response = await deleteInternship(internshipId);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/internships");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to delete internship.", {
        position: "bottom-right",
        autoClose: 2000
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex justify-center items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center">
            Delete Internship
          </h1>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Delete Internship
            </h2>
            
            <p className="text-sm sm:text-base text-gray-600 max-w-md">
              Are you sure you want to delete the internship for the role of{" "}
              <span className="font-semibold text-gray-900">
                {selectedInternship.profile}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 w-full mt-4">
              <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                Internship Details:
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>
                  <span className="font-medium">Type:</span> {selectedInternship.internshipType}
                </li>
                <li>
                  <span className="font-medium">Duration:</span> {selectedInternship.duration}
                </li>
                <li>
                  <span className="font-medium">Openings:</span> {selectedInternship.openings}
                </li>
                <li>
                  <span className="font-medium">Stipend:</span> ₹{selectedInternship.stipendAmount}/month
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 w-full mt-6">
              <Link href="/employee/internships" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md text-sm sm:text-base transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md text-sm sm:text-base transition-colors"
              >
                Delete Internship
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeleteInternship;
