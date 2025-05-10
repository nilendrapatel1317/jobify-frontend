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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Welcome, {student?.firstname}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Link
            href={"/student/internships/appliedIntern"}
            className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center"
          >
            <div className="space-y-4">
              <h2 className="text-2xl">Applied Internships</h2>
              <p className="text-3xl font-bold">{internshipCount}</p>
            </div>
          </Link>
          <Link
            href={"/student/jobs/appliedJobs"}
            className="bg-green-500 text-white p-6 rounded-lg shadow-lg text-center"
          >
            <div className="space-y-4">
              <h2 className="text-2xl">Applied Jobs</h2>
              <p className="text-3xl font-bold">{jobCount}</p>
            </div>
          </Link>
          <div className="bg-yellow-400 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl">Resume</h2>
            <button
              className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200"
              onClick={() => router.push("/student/resume")}
            >
              {hasResume ? "View Resume" : "Create Resume"}
            </button>
          </div>
        </div>

        <section className="mb-10">
          <RenderInternshipCards from="student" />
        </section>

        <section>
          <RenderJobCards from="student" />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
