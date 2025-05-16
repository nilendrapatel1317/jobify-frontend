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
  const { isStudentLoggedIn } = useSelector((state) => state?.student);
  const { isEmployeeLoggedIn } = useSelector((state) => state?.employee);
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
      router?.push("/student/dashboard");
    } else if (isEmployeeLoggedIn) {
      router?.push("/");
    } else {
      router?.push("/student/auth/register");
    }
  }, [isStudentLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrors({});
    try {
      const response = await registerStudent(formData);
      toast?.success(response?.data?.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router?.push("/student/auth/login");
    } catch (error) {
      const backendErrors = error?.response?.data?.data || {};
      const fieldErrors = {};
      toast?.error(error?.response?.data?.msg, {
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
      <main className="flex-1 px-4 sm:px-6 lg:px-10 py-4">
        <Link
          href={`/`}
          className="inline-block bg-blue-500 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg shadow-md text-sm sm:text-base hover:bg-blue-600 transition"
        >
          Home
        </Link>
        <div className="flex justify-between items-center my-6 sm:my-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center w-full">
            Register as Student
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              { label: "First Name", name: "firstname", type: "text" },
              { label: "Last Name", name: "lastname", type: "text" },
              { label: "Contact", name: "contact", type: "text" },
              { label: "City", name: "city", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Password", name: "password", type: "password" }
            ]?.map(({ label, name, type }) => (
              <div key={name}>
                <label className="text-black block font-medium mb-1 text-sm sm:text-base">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full text-black border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
                />
                {errors[name] && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label className="block font-medium mb-1 text-sm sm:text-base text-black">Gender</label>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-black">
              {["Male", "Female", "Others"]?.map((option) => (
                <label key={option} className=" text-black flex items-center gap-2 text-sm sm:text-base">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData?.gender === option}
                    onChange={handleChange}
                    className="accent-purple-500 text-black"
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors?.gender && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">{errors?.gender}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mt-6 sm:mt-10">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-1.5 sm:py-2 px-4 sm:px-6 rounded-lg shadow-md text-sm sm:text-base transition"
            >
              Register
            </button>
            <div className="flex items-center gap-1 sm:gap-2">
              <p className="text-sm sm:text-base text-black">Already have an account ?</p>
              <Link 
                href={"/student/auth/login"} 
                className="text-sm sm:text-base font-bold hover:text-purple-600 text-blue-500 transition"
              >
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
