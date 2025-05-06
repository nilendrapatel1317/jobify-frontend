"use client";
import { getAllInternships } from "@/services/internshipService";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const fetchAllInternships = async () => {
      try {
        const response = await getAllInternships();
        const data = response.data.data;
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_SUCCESS",
          payload: data,
        });
        setInternships(data); // set local state
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error.message,
        });
      }
    };

    fetchAllInternships();
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-6">
      <div className="rounded-2xl p-10 max-w-3xl w-full text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Jobify Portal
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Find a way to achieve your goal 🚀
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <div className="flex flex-col gap-4">
          <h1 className="text-lg">For Student</h1>
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
          <h1 className="text-lg">For Employee</h1>
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
        </div>
      </div>

      {/* Internship Cards Section */}
      {internships.length > 0 && (
        <div className="w-full max-w-8xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Available Internships
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {internship.profile}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    <strong>Type:</strong> {internship.internshipType}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Openings:</strong> {internship.openings}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <strong>Duration:</strong> {internship.duration} months
                  </p>
                  <p className="text-gray-600 mb-4">
                    <strong>Stipend:</strong> ₹{internship.stipendAmount}
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  {/* <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Apply
                  </button> */}
                  <Link
                    href={"#"}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
