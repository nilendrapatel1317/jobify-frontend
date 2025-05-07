"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import { registerStudent } from "@/services/studentService";
import Link from "next/link";
import { toast } from "react-toastify";

const RegisterStudentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isStudentLoggedIn } = useSelector((state) => state.student);
  const { isEmployeeLoggedIn } = useSelector((state) => state.employee);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    city: "",
    gender: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (isStudentLoggedIn) {
      router.push("/student/dashboard");
    } else if (isEmployeeLoggedIn) {
      router.push("/");
    } else {
      router.push("/student/auth/register");
    }
  }, [isStudentLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const response = await registerStudent(formData);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/student/auth/login");
    } catch (error) {
      const backendErrors = error.response?.data?.data || {};
      const fieldErrors = {};
      toast.error(error.response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      for (const key in backendErrors) {
        fieldErrors[key] = backendErrors[key];
      }
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <main className="flex-1 px-10 py-4">
        <Link
          href={`/`}
          className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
        >
          Home
        </Link>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center w-full">
            Register as Student
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white  shadow-xl rounded-2xl p-8 space-y-6 max-w-3xl mx-auto"
        >
          <div className="flex flex-wrap justify-between gap-5">
            {" "}
            {[
              { label: "First Name", name: "firstname", type: "text" },
              { label: "Last Name", name: "lastname", type: "text" },
              { label: "Contact", name: "contact", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" }
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-80 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
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

          <div className="flex justify-between mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Register
            </button>
            <div className="flex items-center gap-2">
              <p>Already have an account ?</p>
              <Link href={"/student/auth/login"} className="text-md font-bold">
                Login
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegisterStudentPage;
