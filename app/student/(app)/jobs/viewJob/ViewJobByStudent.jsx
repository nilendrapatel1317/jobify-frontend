"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import { getAllJobs } from "@/services/jobService";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import PathName from "@/components/globle/PathName";
import { Terminal, Users } from "lucide-react";
import ApplyInternButton from "@/components/Job/ApplyJobButton";
import ApplyJobButton from "@/components/Job/ApplyJobButton";

const ViewJobByStudent = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const [applicantsCount, setApplicantsCount] = useState(0);

  const router = useRouter();
  const dispatch = useDispatch();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);

  const [mounted, setMounted] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [mounted, isStudentLoggedIn]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await getAllJobs();
        dispatch({
          type: "ALL_JOBS_FETCHED_SUCCESS",
          payload: response.data.data
        });

        const allJobs = response.data.data || [];

        const filteredJobs = allJobs.filter((job) => job?.id === jobId);

        setJobs(filteredJobs);
        if (filteredJobs.length > 0) {
          setApplicantsCount(filteredJobs[0].students?.length || 0);
          setIsActive(filteredJobs[0]?.isActive);
        }
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

    if (mounted && student?.id) {
      fetchAllJobs();
    }
  }, [mounted, student]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="student" />
      <main className="ml-0 md:ml-64 flex-1 p-4 md:p-10">
        <PathName />
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Job Detail
          </h1>

          <div className="w-full md:w-auto">
            {isActive ? (
              <ApplyJobButton
                currJob={jobs[0]}
                onApply={(count) => setApplicantsCount(count)}
              />
            ) : (
              <p className="bg-gray-500/50 cursor-none select-none text-white text-sm px-2 py-1 rounded-full italic">
                Application Closed !
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-lg">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-red-500">No jobs found.</p>
        ) : (
          <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-4 md:p-8 space-y-6">
            {jobs.map((job) => (
              <div key={job.id}>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-purple-700 flex items-top gap-2">
                    <Terminal className="text-black w-8 h-8 md:w-10 md:h-10" /> {job.profile}
                  </h2>
                  <p className="text-md bg-gray-200 px-3 py-1 rounded-full">
                    <strong>{job.jobType}</strong>
                  </p>
                </div>

                <div className="text-gray-700 text-base md:text-lg space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 md:mt-10">
                  <p>
                    <strong>Openings:</strong> {job.openings}
                  </p>
                  <p>
                    <strong>Start:</strong> {job.startDate}
                  </p>
                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>
                  <p>
                    <strong>Company Name:</strong> {job.companyName}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Salary Status:</strong> {job.salaryStatus}
                  </p>
                  <p>
                    <strong>Salary (PM):</strong> ₹{job.salary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="mt-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      Skills Required
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                      {job.skills?.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      Your Responsibility
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                      {job.responsibility?.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      Selection Process
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                      {job.assessments?.map((ass, index) => (
                        <li key={index}>{ass}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      Perks
                    </h3>
                    <ul className="list-disc list-inside text-gray-600 ml-4 space-y-1">
                      {job.perks?.map((perk, index) => (
                        <li key={index}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <p className="text-md text-gray-500">
                    {applicantsCount} applicants
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewJobByStudent;