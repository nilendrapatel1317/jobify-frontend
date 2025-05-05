"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";

const JobsPage = () => {
  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector((state) => state.employee);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/employee/auth/login");
    }
  }, [isEmployeeLoggedIn, mounted]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <h1 className="text-2xl text-red-500">Jobs Page</h1>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
