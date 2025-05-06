"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
import { Settings, Edit, Lock, Trash2 } from "lucide-react";
import DeleteStudentProfileButton from "@/components/Student/DeleteStudentProfileButton";

const SettingPage = () => {
  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted]);

  if (!mounted || !student) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="student" />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text flex items-center gap-3">
            Welcome, {student?.firstname}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl">
          <Link
            className="flex items-center justify-center gap-5 bg-yellow-500  text-white text-2xl py-20 rounded-xl shadow-md"
            href={`/student/profile/edit/${student.id}`}
          >
            <Edit className="w-8 h-8" />
            Edit Profile
          </Link>

          <Link
            className="flex items-center justify-center gap-5 bg-blue-500  text-white text-2xl py-20 rounded-xl shadow-md"
            href="/student/settings/password"
          >
            <Lock className="w-8 h-8" />
            Change Password
          </Link>

          <DeleteStudentProfileButton />
        </div>
      </main>
    </div>
  );
};

export default SettingPage;
