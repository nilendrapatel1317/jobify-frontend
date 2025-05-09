"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllJobs } from "@/services/jobService";
import Link from "next/link";

const JobsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const [jobs, setJobs] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        const data = response.data.data;
        dispatch({ type: "ALL_JOBS_FETCHED_SUCCESS", payload: data });
        setJobs(data);
      } catch (error) {
        dispatch({
          type: "ALL_JOBS_FETCHED_FAILED",
          payload: error.message
        });
      }
    };
    fetchJobs();
  }, []);

  if (!mounted || !student) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Available Jobs List
          </h1>
          <Link
            href={"/student/jobs/appliedJobs"}
            className=" bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-3 rounded-full"
          >
            Applied Jobs
          </Link>
        </div>

        <section className="py-8">
          {jobs?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10">
              {jobs
                ?.filter(
                  (job) => !job.students?.some((s) => s.id === student.id)
                )
                .map((job) => (
                  <div
                    key={job.id}
                    className="relative bg-white p-6 rounded-xl shadow-md max-w-sm"
                  >
                    <h3 className="text-2xl font-bold">{job.profile}</h3>
                    <p>
                      <strong>Type:</strong> {job.jobType}
                    </p>
                    <p>
                      <strong>Openings:</strong> {job.openings}
                    </p>
                    <p>
                      <strong>Experience:</strong> {job.duration}
                    </p>
                    <p>
                      <strong>Salary:</strong> ₹{job.salary} /M
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      {/* Status tag */}
                      <div className="bg-gray-100 text-gray-600 flex justify-center items-center px-3 py-1 rounded-full">
                        Apply Now
                      </div>
                      <Link
                        href={`/student/jobs/viewJob?jobId=${job.id}`}
                        className="inline-block bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500 italic">
              🎓 No Jobs added right now
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default JobsPage;
