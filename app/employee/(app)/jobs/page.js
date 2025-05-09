"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { getAllJobs } from "@/services/jobService";

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );

  const [mounted, setMounted] = useState(false);
  const [jobs, setJobs] = useState([]);
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
    const fetchAllJobs = async () => {
      try {
        const response = await getAllJobs();
        dispatch({
          type: "ALL_JOBS_FETCHED_SUCCESS",
          payload: response.data.data
        });
        const allJobs = response.data.data || [];

        const filteredJobs = allJobs.filter(
          (job) => job.employee?.id === employee?.id
        );

        setJobs(filteredJobs);
        setLoading(false);
      } catch (error) {
        dispatch({
          type: "ALL_JOBS_FETCHED_FAILED",
          payload: error.message
        });
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    if (mounted && employee?.id) {
      fetchAllJobs();
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
          <p className="text-center text-lg">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-red-500">No jobs found.</p>
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
                  <th className="py-3 px-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-2 px-2">{job.id}</td>
                    <td className="py-2 px-2">{job.profile}</td>
                    <td className="py-2 px-2">{job.openings}</td>
                    <td className="py-2 px-2">{job.experience}</td>
                    <td className="py-2 px-2">₹{job.salary}</td>
                    <td className="py-2 px-2">{job.location}</td>
                    <td className="py-2 px-2 space-x-2 text-center">
                      <Link
                        href={`/employee/jobs/editJob?jobId=${job.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/employee/jobs/deleteJob?jobId=${job.id}`}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </Link>
                      <Link
                        href={`/employee/jobs/viewJob?jobId=${job.id}`}
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

export default page;
