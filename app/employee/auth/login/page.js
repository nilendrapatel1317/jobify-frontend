"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { loginEmployee } from "@/services/employeeService";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isEmployeeLoggedIn, error } = useSelector((state) => state.employee);
  const { isStudentLoggedIn } = useSelector((state) => state.student);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isEmployeeLoggedIn) {
      router.push("/employee/dashboard");
    } else if (isStudentLoggedIn) {
      router.push("/");
    } else {
      router.push("/employee/auth/login");
    }
  }, [isEmployeeLoggedIn, isStudentLoggedIn]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginEmployee(form);
      const res = await loginEmployee(form);
      dispatch({ type: "EMPLOYEE_LOGIN_SUCCESS", payload: response.data.data });
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/dashboard");
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      dispatch({
        type: "EMPLOYEE_LOGIN_FAILURE",
        payload: "Invalid credentials"
      });
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
            Employee Login
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-md mx-auto"
        >
          {[
            { label: "Email", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" }
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="flex justify-between mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Login
            </button>
            <div className="flex items-center gap-2">
              <p>Don't have an account?</p>
              <Link
                href={"/employee/auth/register"}
                className="text-md font-bold"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
