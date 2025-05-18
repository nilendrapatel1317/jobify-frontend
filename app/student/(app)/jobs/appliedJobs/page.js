"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllJobs } from "@/services/jobService";
import Link from "next/link";
import WithdrawJobButton from "@/components/Job/WithdrawJobButton";

const page = () => {
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

  const filteredJobs = jobs?.filter((job) =>
    job.students?.some((s) => s.id === student.id)
  );

  if (!mounted || !student) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8">
        <PathName />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Applied Jobs List
          </h1>
        </div>

        <section className="py-4 sm:py-6 lg:py-8">
          {filteredJobs?.length > 0 ? (
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-md rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gradient-to-r from-blue-500 to-purple-500">
                      <tr>
                        <th className="py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          S.No
                        </th>
                        <th className="py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          Profile
                        </th>
                        <th className="hidden sm:table-cell py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          Job Type
                        </th>
                        <th className="hidden sm:table-cell py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          Openings
                        </th>
                        <th className="hidden lg:table-cell py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          Experience
                        </th>
                        <th className="hidden lg:table-cell py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          Location
                        </th>
                        <th className="hidden lg:table-cell py-3 px-3 text-left text-xs sm:text-sm text-white font-semibold">
                          Salary (PM)
                        </th>
                        <th className="py-3 px-3 text-center text-xs sm:text-sm text-white font-semibold">
                          Status
                        </th>
                        <th className="py-3 px-3 text-center text-xs sm:text-sm text-white font-semibold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredJobs.map((job, index) => (
                        <tr
                          key={job.id}
                          className={`hover:bg-gray-50 transition ${
                            job?.isActive
                              ? "text-black"
                              : "line-through opacity-60 text-red-500 italic font-semibold"
                          }`}
                        >
                          <td className="py-2 px-3 text-sm sm:text-base">
                            {index + 1}
                          </td>
                          <td className="py-2 px-3 text-sm sm:text-base font-medium">
                            {job.profile}
                          </td>
                          <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base">
                            {job.jobType}
                          </td>
                          <td className="hidden sm:table-cell py-2 px-3 text-sm sm:text-base">
                            {job.openings}
                          </td>
                          <td className="hidden lg:table-cell py-2 px-3 text-sm sm:text-base">
                            {job.experience}{" "}
                            {job?.experience > 0
                              ? job?.experience == 1
                                ? "Year"
                                : "Years"
                              : ""}
                          </td>
                          <td className="hidden lg:table-cell py-2 px-3 text-sm sm:text-base">
                            {job.location}
                          </td>
                          <td className="hidden lg:table-cell py-2 px-3 text-sm sm:text-base">
                            ₹{job.salary}
                          </td>
                          <td className="py-2 px-3">
                            <div className="flex items-center justify-center">
                              <span
                                className={`px-2 py-1 text-xs sm:text-sm rounded-full font-medium ${
                                  job?.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {job?.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </td>
                          <td className="py-2 px-3 min-w-[180px]">
                            <div className="flex flex-row items-center justify-center gap-2">
                              <Link
                                href={`/student/jobs/viewJob?jobId=${job.id}`}
                              >
                                <button className="whitespace-nowrap bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                                  Details
                                </button>
                              </Link>
                              <WithdrawJobButton
                                jobId={job?.id}
                                onWithdraw={(id) => {
                                  setJobs((prev) =>
                                    prev.map((j) =>
                                      j?.id === id
                                        ? {
                                            ...j,
                                            students: j?.students?.filter(
                                              (s) => s?.id !== student?.id
                                            )
                                          }
                                        : j
                                    )
                                  );
                                }}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-20 sm:mt-40 lg:mt-60">
              <p className="text-center text-base sm:text-lg text-gray-500 italic">
                🎓 No Jobs Applied by you right now
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default page;
