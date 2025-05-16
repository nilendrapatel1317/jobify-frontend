"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import { toast } from "react-toastify";
import { updateEmployee } from "@/services/employeeService";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
import { UserCog } from "lucide-react";

const EditEmployeePage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isEmployeeLoggedIn, employee } = useSelector((state) => state.employee);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    city: "",
    gender: "",
    organizationName: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
    if (employee) {
      setFormData({
        firstname: employee.firstname || "",
        lastname: employee.lastname || "",
        contact: employee.contact || "",
        city: employee.city || "",
        gender: employee.gender || "",
        organizationName: employee.organizationName || ""
      });
    }
  }, [employee]);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/");
    }
  }, [isEmployeeLoggedIn, mounted]);

  if (!mounted || !employee) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await updateEmployee(employee.id, formData);
      dispatch({
        type: "EMPLOYEE_UPDATE_SUCCESS",
        payload: response.data.data
      });
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/profile");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.data) {
        dispatch({ type: "EMPLOYEE_UPDATE_FAILURE", payload: error.message });
        toast.error(error.response.data.msg, {
          position: "bottom-right",
          autoClose: 2000
        });
        const backendErrors = error.response.data.data;
        const fieldErrors = {};
        for (const key in backendErrors) {
          if (backendErrors.hasOwnProperty(key)) {
            fieldErrors[key] = backendErrors[key];
          }
        }
        setErrors(fieldErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />

      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex justify-center items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text flex items-center gap-2 sm:gap-3">
            <UserCog className="w-6 h-6 sm:w-8 sm:h-8" />
            Edit Your Profile
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-sm sm:max-w-2xl lg:max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              {errors.firstname && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.firstname}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              {errors.lastname && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.lastname}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.contact}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1 text-sm sm:text-base">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              {errors.city && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className="block font-medium mb-1 text-sm sm:text-base">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              />
              {errors.organizationName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.organizationName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2 text-sm sm:text-base">Gender</label>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {["Male", "Female", "Others"].map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleChange}
                    className="accent-purple-500 w-4 h-4"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end mt-6 sm:mt-8 gap-3">
            <Link 
              href="/employee/profile"
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
              Update Profile
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditEmployeePage;
