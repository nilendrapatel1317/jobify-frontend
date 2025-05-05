"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { toast } from "react-toastify";
import { changePasswordEmployee } from "@/services/employeeService";

const EmpChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: ""
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await changePasswordEmployee(employee.id, formData);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/settings");
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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="ml-64 flex-1 p-10">
        <PathName />
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Change Password
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-lg mx-auto"
        >
          <div>
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Change Password
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EmpChangePassword;
