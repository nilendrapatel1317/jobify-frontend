"use client";

import React, { useEffect, useState } from "react";

// import { getAllJobs } from "@/services/jobService"; // Assuming similar API exists
import Link from "next/link";
import { useDispatch } from "react-redux";
import RenderInternshipCards from "@/components/Internship/RenderInternshipCards";

const Page = () => {
  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white/10">
        <div className="flex items-center space-x-3 ">
          <img
            src="https://imgs.search.brave.com/nG1XXrjBGwj_rWKgiJkqEsDlf4PbjUpJ0kzu9eRx4Ag/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aXN0b2NrcGhvdG8u/Y29tL3Jlc291cmNl/cy9pbWFnZXMvRnJl/ZVBob3Rvcy9GcmVl/LVBob3RvLTc0MHg0/OTItMTc0NDkxNTMz/My5qcGc"
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800">Jobify Portal</h1>
        </div>
        <div className="flex space-x-4 relative">
          <div className="relative">
            <button
              onClick={() => {
                setShowLogin(!showLogin);
                setShowRegister(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
            {showLogin && (
              <div className="absolute right-0 mt-4 w-48 bg-black/5 shadow-lg rounded-lg">
                <Link
                  href="/student/auth/login"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Login as Student
                </Link>
                <Link
                  href="/employee/auth/login"
                  className="block px-4 py-2 hover:bg-gray-100"
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Register
            </button>
            {showRegister && (
              <div className="absolute right-0 mt-4 w-56 bg-black/5 shadow-lg rounded-lg">
                <Link
                  href="/student/auth/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Register as Student
                </Link>
                <Link
                  href="/employee/auth/register"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Register as Employee
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Top */}
      <section className="text-center py-16 px-6">
        <h2 className="text-5xl font-extrabold text-gray-800">Jobify Portal</h2>
        <p className="mt-4 text-xl text-gray-600">
          Find internships and jobs that launch your career 🚀
        </p>
      </section>

      {/* Main Middle - Internships */}
      <div className="px-40">
        <RenderInternshipCards from="home"/>
      </div>

      {/* Main Bottom - Jobs */}
      {/* <section className="px-6 py-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Latest Jobs</h3>
        {jobs.length > 0 ? (
          <>
            {renderCards(jobs, "job")}
            <div className="text-center mt-8">
              <Link href="/student/auth/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition">View More Jobs</Link>
            </div>
          </>
        ) : (
          <p className="text-center text-lg text-gray-500 italic">💼 No Jobs added right now</p>
        )}
      </section> */}
    </div>
  );
};

export default Page;
