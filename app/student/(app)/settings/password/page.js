"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { changePasswordStudent } from "@/services/studentService";
import { toast } from "react-toastify";
import Link from "next/link";
import { Lock } from "lucide-react";

const ChangePasswordPage = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await changePasswordStudent(student.id, formData);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/student/settings");
    } catch (error) {
      if (error.response?.data?.data) {
        const backendErrors = error.response.data.data;
        const fieldErrors = {
          currentPassword: backendErrors.currentPassword || "",
          newPassword: backendErrors.password || ""
        };
        setErrors(fieldErrors);
        toast.error(error.response.data.msg, {
          position: "bottom-right",
          autoClose: 2000
        });
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="student" />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex justify-center items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text flex items-center gap-2 sm:gap-3">
            <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
            Change Password
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto"
        >
          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end mt-6 sm:mt-8 gap-3">
            <Link 
              href="/student/settings"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg shadow-md text-sm sm:text-base transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg shadow-md text-sm sm:text-base transition-colors"
            >
              Change Password
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ChangePasswordPage;
