import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-3xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Jobify Portal
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Find a way to achive your goal 🚀
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <Link
              href="/student/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Student Login
            </Link>
            <Link
              href="/student/auth/register"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Student Register
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              href="/employee/auth/login"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Employee Login
            </Link>
            <Link
              href="/employee/auth/register"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Employee Register
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="/internship"
              className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Internship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
