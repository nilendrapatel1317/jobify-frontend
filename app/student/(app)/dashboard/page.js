"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import RenderInternshipCards from "@/components/Internship/RenderInternshipCards";
import Link from "next/link";
import RenderJobCards from "@/components/Job/RenderJobCards";

const DashboardPage = () => {
  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state?.student);
  const { internship } = useSelector((state) => state?.internship);
  const { job } = useSelector((state) => state?.job);
  const [mounted, setMounted] = useState(false);

  const internshipCount =
    internship?.filter((i) => i?.students?.some((s) => s?.id === student?.id))
      ?.length || 0;

  const jobCount =
    job?.filter((i) => i?.students?.some((s) => s?.id === student?.id))
      ?.length || 0;


  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted]);

  if (!mounted || !student) return null;

  const hasResume = student.resume !== null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 lg:mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center sm:text-left mb-4 sm:mb-0">
            Welcome, {student?.firstname}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
          <Link
            href={"/student/internships/appliedIntern"}
            className="bg-blue-500 text-white p-4 lg:p-6 rounded-lg shadow-lg text-center"
          >
            <div className="space-y-3 lg:space-y-4">
              <h2 className="text-xl lg:text-2xl">Applied Internships</h2>
              <p className="text-2xl lg:text-3xl font-bold">{internshipCount}</p>
            </div>
          </Link>
          <Link
            href={"/student/jobs/appliedJobs"}
            className="bg-green-500 text-white p-4 lg:p-6 rounded-lg shadow-lg text-center"
          >
            <div className="space-y-3 lg:space-y-4">
              <h2 className="text-xl lg:text-2xl">Applied Jobs</h2>
              <p className="text-2xl lg:text-3xl font-bold">{jobCount}</p>
            </div>
          </Link>
          {/* <div className="bg-yellow-400 text-white p-4 lg:p-6 rounded-lg shadow-lg">
            <h2 className="text-xl lg:text-2xl">Resume</h2>
            <button
              className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 w-full sm:w-auto"
              onClick={() => router.push("/student/resume")}
            >
              {hasResume ? "View Resume" : "Create Resume"}
            </button>
          </div> */}
        </div>

        <section className="mb-6 lg:mb-10">
          <RenderInternshipCards from="student" />
        </section>

        <section className="mb-6">
          <RenderJobCards from="student" />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
