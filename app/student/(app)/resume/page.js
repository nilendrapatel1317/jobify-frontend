"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getCurrStdResume } from "@/services/resumeService";
import PersonalInfoCard from "@/components/Resume/PersonalInfoCard";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  // const { resume } = useSelector((state) => state.resume); // Assuming you have resume in your Redux store
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(student);
    console.log(student.resume);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted, router]);

  // useEffect(() => {
  //   const fetchCurrStdResume = async () => {
  //     try {
  //       if (!student?.id) return;
  //       console.log(student?.id)
  //       const response = await getCurrStdResume(student?.id);
  //       if (response?.data?.data) {
  //         dispatch({
  //           type: "CURRENT_STD_RESUME_FETCHED_SUCCESS",
  //           payload: response?.data?.data
  //         });
  //       } else {
  //         dispatch({
  //           type: "CURRENT_STD_RESUME_FETCHED_FAILED",
  //           payload: "Resume not found"
  //         });
  //       }
  //       setLoading(false);
  //     } catch (error) {
  //       dispatch({
  //         type: "CURRENT_STD_RESUME_FETCHED_FAILED",
  //         payload: error.response?.data?.msg || error.message
  //       });
  //       console.error("Error fetching resume:", error);
  //       setLoading(false);
  //     }
  //   };

  //   if (mounted && student?.id) {
  //     fetchCurrStdResume();
  //   }
  // }, [mounted, student, dispatch]);

  if (!mounted || !student) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Your Resume
          </h1>
        </div>

        <div className="mb-8 sm:mb-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : student.resume ? (
            <>
              <div id="resume-content">
                <PersonalInfoCard student={student} />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl sm:text-2xl text-gray-700 mb-4">
                No resume found
              </h2>
              <button
                onClick={() => router.push("/student/resume/create")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md"
              >
                Create Your Resume
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default page;
