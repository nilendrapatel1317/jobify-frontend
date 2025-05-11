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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Applied Jobs List
          </h1>
        </div>

        <section className="py-8">
          {filteredJobs?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md ">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <th className="py-3 px-2 text-left">S.No</th>
                    <th className="py-3 px-2 text-left">Profile</th>
                    <th className="py-3 px-2 text-left">Job Type</th>
                    <th className="py-3 px-2 text-left">Openings</th>
                    <th className="py-3 px-2 text-left">Experience</th>
                    <th className="py-3 px-2 text-center">Location</th>
                    <th className="py-3 px-2 text-left">Salary Amount (PM)</th>
                    <th className="py-3 px-2 text-center">Status</th>
                    <th className="py-3 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job, index) => (
                    <tr key={job.id} className="border-y hover:bg-gray-50 h-16">
                      <td className="py-2 px-2 text-lg">{index + 1}</td>
                      <td className="py-2 px-2 text-lg">{job.profile}</td>
                      <td className="py-2 px-2 text-lg ">{job.jobType}</td>
                      <td className="py-2 px-2 text-lg">{job.openings}</td>
                      <td className="py-2 px-2 text-lg">
                        {job.experience}{" "}
                        {job?.experience > 0
                          ? job?.experience == 1
                            ? "Year"
                            : "Years"
                          : ""}{" "}
                      </td>
                      <td className="py-2 px-2 text-lg">{job.location}</td>
                      <td className="py-2 px-2 text-lg">₹{job.salary}</td>
                      <td className="text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            job?.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {job?.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="text-center space-x-3">
                        <Link href={`/student/jobs/viewJob?jobId=${job.id}`}>
                          <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                            Details
                          </button>
                        </Link>
                        <WithdrawJobButton
                          jobId={job?.id}
                          onWithdraw={(id) => {
                            setJobs((prev) =>
                              prev.map((job) =>
                                job?.id === id
                                  ? {
                                      ...job,
                                      students: job?.students?.filter(
                                        (s) => s?.id !== student?.id
                                      )
                                    }
                                  : job
                              )
                            );
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500 italic mt-60">
              🎓 No Jobs Applied by you right now
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default page;
