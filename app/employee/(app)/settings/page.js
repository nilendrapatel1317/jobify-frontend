"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
import { Edit, Lock } from "lucide-react";
import DeleteEmpProfileButton from "@/components/Employee/DeleteEmpProfileButton";

const SettingPage = () => {
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

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"employee"} />

      <main className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-start flex-col mb-8">
          <PathName />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text flex items-center">
            Employee Setting 
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl">
          <Link
            className="flex items-center justify-center gap-5 bg-yellow-500  text-white text-2xl py-20 rounded-xl shadow-md"
            href={`/employee/profile/edit/${employee.id}`}
          >
            <Edit className="w-8 h-8" />
            Edit Profile
          </Link>

          <Link
            className="flex items-center justify-center gap-5 bg-blue-500  text-white text-2xl py-20 rounded-xl shadow-md"
            href="/employee/settings/password"
          >
            <Lock className="w-8 h-8" />
            Change Password
          </Link>

          <DeleteEmpProfileButton />
        </div>
      </main>
    </div>
  );
};

export default SettingPage;
