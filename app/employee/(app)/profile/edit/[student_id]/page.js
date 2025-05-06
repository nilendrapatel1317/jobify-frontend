"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import { toast } from "react-toastify";
import { updateEmployee } from "@/services/employeeService";
import PathName from "@/components/globle/PathName";
import Link from "next/link";

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
    organizationName:""
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
      router.push("/employee/profile"); // or refresh page
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
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />

      <main className="ml-64 flex-1 p-10">
      <PathName />
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Edit Your Profile
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto"
        >
          <div className="flex flex-wrap justify-between gap-5">
            <div>
              <label className="block font-medium mb-1">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label className="block font-medium mb-1">Organization Name</label>
              <input
                type="text"
                name="organizationName"
                value={formData.organizationName}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.organizationName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Gender</label>
            <div className="flex gap-6">
              {["Male", "Female", "Others"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleChange}
                    className="accent-purple-500"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          <div className="flex justify-end mt-10 gap-3">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Update Profile
            </button>
            <Link href={"/employee/profile"}>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditEmployeePage;
