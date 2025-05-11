"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { getAllJobs } from "@/services/jobService";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ActivateDeactivateButton from "@/components/Job/ActivateDeactivateButton";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state?.employee
  );

  const [mounted, setMounted] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router?.push("/");
    }
  }, [mounted, isEmployeeLoggedIn]);

  const fetchAllJobs = async () => {
    try {
      const response = await getAllJobs();
      dispatch({
        type: "ALL_JOBS_FETCHED_SUCCESS",
        payload: response?.data?.data
      });
      const allJobs = response?.data?.data || [];

      const filteredJobs = allJobs?.filter(
        (job) => job?.employee?.id === employee?.id
      );

      setJobs(filteredJobs);
    } catch (error) {
      dispatch({
        type: "ALL_JOBS_FETCHED_FAILED",
        payload: error?.message
      });
      console?.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (mounted) {
      fetchAllJobs();
    }
  }, [mounted, employee]);

  const handleStatusChange = (jobId, newStatus) => {
    setJobs((prev) =>
      prev?.map((job) =>
        job?.id === jobId ? { ...job, isActive: newStatus } : job
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
            Jobs Added By You
          </h1>
          <Link
            href={"/employee/jobs/addJob"}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
          >
            + Add Job
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : jobs?.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-lg text-gray-500 italic mb-4">No jobs found?.</p>
            <Link
              href="/employee/jobs/addInternship"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all"
            >
              Add Your First Internship
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <th className="py-3 px-2 text-left">ID</th>
                  <th className="py-3 px-2 text-left">Profile</th>
                  <th className="py-3 px-2 text-left">Openings</th>
                  <th className="py-3 px-2 text-left">Experience</th>
                  <th className="py-3 px-2 text-left">Salary</th>
                  <th className="py-3 px-2 text-left">Location</th>
                  <th className="py-3 px-2 text-left">Status</th>
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs?.map((job) => (
                  <tr
                    key={job?.id}
                    className={`border-t border-black hover:bg-gray-50 transition ${
                      job?.isActive
                        ? ""
                        : "line-through opacity-60 text-red-500 italic font-semibold"
                    }`}
                  >
                    <td className="py-2 px-2">{job?.id}</td>
                    <td className="py-2 px-2">{job?.profile}</td>
                    <td className="py-2 px-2">{job?.openings}</td>
                    <td className="py-2 px-2">{job?.experience} {job?.experience > 0 ? job?.experience == 1 ? "Year" : "Years" : ""}</td>
                    <td className="py-2 px-2">₹{job?.salary}</td>
                    <td className="py-2 px-2">{job?.location}</td>
                    <td className="py-4 px-4">
                      <div className="flex gap-3 items-center">
                        <ActivateDeactivateButton
                          jobId={job?.id}
                          isActive={job?.isActive}
                          onStatusChange={(newStatus) =>
                            handleStatusChange(job?.id, newStatus)
                          }
                        />
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job?.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job?.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>

                    <td className="py-2 px-2 space-x-2 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <Link
                          href={`/employee/jobs/viewJob?jobId=${job?.id}`}
                          className="p-2 rounded-full hover:bg-blue-100 text-blue-600 transition-colors"
                          title="View"
                        >
                          <Eye className="h-6 w-6" />
                        </Link>
                        <Link
                          href={`/employee/jobs/editJob?jobId=${job?.id}`}
                          className={`p-2 rounded-full  transition-colors ${
                            !job?.isActive
                              ? "pointer-events-none text-gray-400 "
                              : "hover:bg-yellow-100 text-yellow-600"
                          }`}
                          title="Edit"
                        >
                          <Pencil className="h-6 w-6" />
                        </Link>
                        <Link
                          href={`/employee/jobs/deleteJob?jobId=${job?.id}`}
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
