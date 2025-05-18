"use client";

import React, { useEffect, useState } from "react";

// import { getAllJobs } from "@/services/jobService"; // Assuming similar API exists
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import RenderInternshipCards from "@/components/Internship/RenderInternshipCards";
import RenderJobCards from "@/components/Job/RenderJobCards";

const Page = () => {
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        const data = response.data.data;
        dispatch({ type: "ALL_JOBS_FETCHED_SUCCESS", payload: data });
        setJobs(data.slice(0, 6));
      } catch (error) {
        dispatch({ type: "ALL_JOBS_FETCHED_FAILED", payload: error.message });
      }
    };

    // fetchJobs();
  }, []);

  return (
    <div className="overflow-hidden min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 shadow-md bg-white/10 gap-4 sm:gap-0">
        <div className="flex items-center space-x-3">
          <Link href={"/"}>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Jobify Portal</h1>
          </Link>
        </div>
        <div className="flex space-x-2 sm:space-x-4 relative">
          {mounted &&
          ((isEmployeeLoggedIn && employee) ||
            (isStudentLoggedIn && student)) ? (
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
              <img
                src="https://imgs.search.brave.com/nG1XXrjBGwj_rWKgiJkqEsDlf4PbjUpJ0kzu9eRx4Ag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvRnJl/ZVBob3Rvcy9GcmVl/LVBob3RvLTc0MHg0/OTItMTc0NDkxNTMz/My5qcGc"
                alt="Logo"
                className="h-7 w-7 rounded-full"
              />
              <div className="text-center sm:text-left">
                <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                  {isEmployeeLoggedIn
                    ? `${employee?.firstname || ""} ${employee?.lastname || ""}`
                    : `${student?.firstname || ""} ${student?.lastname || ""}`}
                </h1>

                <div className="flex items-center justify-center">
                  <p className="text-[10px] text-center leading-2 text-green-500 bg-gray-200 py-1 px-1 w-fit rounded-full">
                    {isEmployeeLoggedIn ? "Employee" : "Student"}
                  </p>
                </div>
              </div>
              <Link
                href={
                  isEmployeeLoggedIn
                    ? "/employee/dashboard"
                    : "/student/dashboard"
                }
                className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm sm:text-base hover:bg-blue-600 transition"
              >
                Dashboard
              </Link>
            </div>
          ) : (
            <>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowLogin(!showLogin);
                    setShowRegister(false);
                  }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Login
                </button>
                {showLogin && (
                  <div className="absolute -left-5 mt-2 w-48 bg-white text-black shadow-lg rounded-lg z-50">
                    <Link
                      href="/student/auth/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Login as Student
                    </Link>
                    <Link
                      href="/employee/auth/login"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Login as Employee
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowRegister(!showRegister);
                    setShowLogin(false);
                  }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base"
                >
                  Register
                </button>
                {showRegister && (
                  <div className="absolute -left-26 mt-2 w-56 bg-white text-black shadow-lg rounded-lg z-50">
                    <Link
                      href="/student/auth/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Register as Student
                    </Link>
                    <Link
                      href="/employee/auth/register"
                      className="block px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Register as Employee
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main Top  */}
            <section className={`text-center py-8 sm:py-16 px-4 sm:px-6 flex items-center justify-center flex-col ${mounted && isEmployeeLoggedIn ? "h-[88vh]":" sm:h-auto"}`}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800">Jobify Portal</h2>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600">
          Find internships and jobs that launch your career 🚀
        </p>
      </section>

      {/* Main Middle - Internships */}
      <div className="px-0 sm:px-6 lg:px-40">
        {mounted && !isEmployeeLoggedIn && <RenderInternshipCards from="home" />}
      </div>
      
      {/* Main Bottom - Jobs */}
      <div className="px-0 sm:px-6 lg:px-40">
        {mounted && !isEmployeeLoggedIn && <RenderJobCards from="home" />}
      </div>
    </div>
  );
};

export default Page;
