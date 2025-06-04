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
        console.log(response)

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
    <section className="py-4 lg:py-8">
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6 px-4 lg:px-0">Latest Jobs</h3>

      {jobs?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-0">
            {jobs?.map((job) => (
              <div
                key={job?.id}
                className="relative text-black bg-white p-4 lg:p-6 rounded-xl shadow-md w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl lg:text-2xl font-bold text-black">
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
                    {job?.isActive ? "Active" : "InActive"}
                  </p>
                </div>
                <div className="space-y-2 text-black">
                  <p className="text-sm lg:text-base">
                    <strong>Type:</strong> {job?.jobType}
                  </p>
                  <p className="text-sm lg:text-base">
                    <strong>Openings:</strong> {job?.openings}
                  </p>
                  <p className="text-sm lg:text-base">
                    <strong>Experience:</strong> {job?.experience}
                  </p>
                  <p className="text-sm lg:text-base">
                    <strong>Salary:</strong> ₹{job?.salary} /M
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {job?.postedAt ? (
                    <TimeAgo timestamp={job?.postedAt} />
                  ) : (
                    <p className="text-xs lg:text-sm text-black italic flex mt-3 gap-2 items-center">
                      <TimerResetIcon className="w-4 h-4" />
                      posted 30+ days ago
                    </p>
                  )}
                  <Link
                    href={`/student/jobs/viewJob?jobId=${job?.id}`}
                    className="inline-block bg-blue-400 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base font-semibold transition hover:bg-blue-500"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-8">
            <Link
              href={isStudentLoggedIn ? "/student/jobs" : "/student/auth/login"}
              className="bg-blue-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg hover:bg-blue-700 font-semibold transition text-sm lg:text-base"
            >
              View More Jobs
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-base lg:text-lg text-gray-500 italic px-4 lg:px-0">
          🎓 No Jobs available for you right now
        </p>
      )}
    </section>
  );
};

export default RenderJobCards;
