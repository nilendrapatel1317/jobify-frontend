"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllInternships } from "@/services/internshipService";
import Link from "next/link";
import { getAllJobs } from "@/services/jobService";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );
  const { internship } = useSelector((state) => state?.internship);
  const { job } = useSelector((state) => state?.job);

  const [mounted, setMounted] = useState(false);


  const internshipCount =
    internship?.filter((i) => i?.employee?.id === employee?.id)?.length || 0;

  const jobCount =
    job?.filter((i) => i?.employee?.id === employee?.id)?.length || 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/");
    }
  }, [mounted, isEmployeeLoggedIn]);

  // Avoid hydration mismatch by only rendering after mounted
  if (!mounted || !employee) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"employee"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Welcome, {employee?.firstname}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-3xl">
          <Link href={"/employee/internships"}>
            <div className="bg-blue-500 flex flex-col gap-5 text-white py-16 px-6 rounded-lg shadow-lg">
              <h2>Total Internships Added</h2>
              <p className="font-bold">{internshipCount}</p>
            </div>
          </Link>
          <Link href={"/employee/jobs"}>
            <div className="bg-green-500 flex flex-col gap-5 text-white py-16 px-6 rounded-lg shadow-lg">
              <h2>Total Jobs Added</h2>
              <p className="font-bold">{jobCount}</p>
            </div>
          </Link>
        </div>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Internships created by You
          </h2>
          <div className="space-y-4">
            {dummyInternships.map((intern) => (
              <div
                key={intern.id}
                className="bg-white p-4 rounded shadow border"
              >
                <h3 className="text-lg font-semibold">{intern.title}</h3>
                <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Apply
                </button>
              </div>
            ))}
          </div>

          <p>Not Available</p>
        </section> */}

        {/* <section>
          <h2 className="text-2xl font-semibold mb-4">Jobs created by you</h2>
          <div className="space-y-4">
            {dummyJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded shadow border">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Apply
                </button>
              </div>
            ))}
          </div>
          <p>Not Available</p>
        </section> */}
      </main>
    </div>
  );
};

export default DashboardPage;
