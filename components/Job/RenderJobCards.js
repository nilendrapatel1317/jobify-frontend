"use client";
import { getAllJobs } from "@/services/jobService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../globle/TimeAgo";
import { TimerResetIcon } from "lucide-react";

const RenderJobCards = ({ from }) => {
  const [jobs, setJobs] = useState([]);
  const dispatch = useDispatch();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        const data = response?.data.data;
        console.log(data);

        dispatch({ type: "ALL_JOBS_FETCHED_SUCCESS", payload: data });

        // Step 1: Filter jobs not applied by the current student
        const notAppliedJobs = data.filter(
          (job) => !job?.students?.some((s) => s?.id === student?.id)
        );

        // Step 2: Show 3 or 6 based on 'from'
        const count = from === "student" ? 3 : 6;
        setJobs(notAppliedJobs.slice(0, count));
      } catch (error) {
        dispatch({
          type: "ALL_JOBS_FETCHED_FAILED",
          payload: error?.message
        });
      }
    };

    fetchJobs();
  }, [from, dispatch, student?.id]);

  return (
    <section className="py-8">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Latest Jobs</h3>

      {jobs?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10">
            {jobs?.map((job) => (
              <div
                key={job?.id}
                className="relative bg-white p-6 rounded-xl shadow-md max-w-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {" "}
                    {job?.profile?.length > 15
                      ? `${job.profile.substring(0, 15)}...`
                      : job?.profile}
                  </h3>
                  <p
                    className={`text-sm px-2 py-1 rounded-full italic ${
                      job?.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500/50 cursor-none select-none text-white"
                    }`}
                  >
                    {job?.isActive ? "Active" : "Close"}
                  </p>
                </div>
                <p>
                  <strong>Type:</strong> {job?.jobType}
                </p>
                <p>
                  <strong>Openings:</strong> {job?.openings}
                </p>
                <p>
                  <strong>Experience:</strong> {job?.experience}
                </p>
                <p>
                  <strong>Salary:</strong> ₹{job?.salary} /M
                </p>

                <div className="flex justify-between items-center mt-4">
                  {job?.postedAt ? (
                    <TimeAgo timestamp={job?.postedAt} />
                  ) : (
                    <p className="text-sm text-black/50 italic flex mt-3 gap-2 items-center">
                      <TimerResetIcon className="w-4 h-4" />
                      posted 30+ days ago
                    </p>
                  )}
                  <Link
                    href={`/student/jobs/viewJob?jobId=${job?.id}`}
                    className="inline-block bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href={isStudentLoggedIn ? "/student/jobs" : "/student/auth/login"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              View More Jobs
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-500 italic">
          🎓 No Jobs available for you right now
        </p>
      )}
    </section>
  );
};

export default RenderJobCards;
