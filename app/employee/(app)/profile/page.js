"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";

const DashboardPage = () => {
  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector((state) => state.employee);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/");
    }
  }, [isEmployeeLoggedIn, mounted]);

  if (!mounted || !employee) return null;

  const internshipCount = Array.isArray(employee.internships)
    ? employee.internships.length
    : 0;
  const jobCount = Array.isArray(employee.jobs) ? employee.jobs.length : 0;
  const hasResume = employee.resume !== null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"employee"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="relative w-full rounded-xl shadow-md mb-20">
          {/* Banner Placeholder */}
          <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          <div className="absolute top-36 left-10 flex items-end gap-4">
            <img
              src={employee?.organizationLogo?.url}
              alt="Avatar"
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {employee?.firstname} {employee?.lastname}
              </h2>
              <p className="text-gray-600">{employee?.email}</p>
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-600 hover:to-blue-600 border border-white text-white font-semibold py-2 px-6 rounded-lg shadow-md"
              onClick={() =>
                router.push(`/employee/profile/edit/${employee?.id}`)
              }
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p>
              <strong>ID:</strong> {employee?.id}
            </p>
            <p>
              <strong>Contact:</strong> {employee?.contact}
            </p>
            <p>
              <strong>City:</strong> {employee?.city}
            </p>
            <p>
              <strong>Gender:</strong> {employee?.gender}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <p className="mb-5">
              <strong>Organization Name:</strong> {employee?.organizationName}
            </p>
            <h3 className="text-lg font-semibold mb-2">Hiring Applications</h3>
            <p>
              <strong>Total Internships Creaded:</strong> {internshipCount}
            </p>
            <p>
              <strong>Total Jobs Creaded:</strong> {jobCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-3">About Me</h3>
          <p className="text-gray-700">
            Hello! I'm a dedicated employee eager to learn and grow in the tech
            industry. Passionate about web development, Java, and creating
            impactful applications. Always curious and ready to take on
            challenges. This section will be updated soon with more about my
            journey and aspirations.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
