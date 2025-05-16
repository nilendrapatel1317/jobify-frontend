"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllInternships } from "@/services/internshipService";
import Link from "next/link";
import { TimerResetIcon } from "lucide-react";
import TimeAgo from "@/components/globle/TimeAgo";

const InternshipsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const [internships, setInternships] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isStudentLoggedIn) {
      router.push("/");
    }
  }, [isStudentLoggedIn, mounted]);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await getAllInternships();
        const data = response?.data?.data;
        dispatch({ type: "ALL_INTERNSHIPS_FETCHED_SUCCESS", payload: data });
        setInternships(data);
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error?.message
        });
      }
    };
    fetchInternships();
  }, []);

  const filteredInternships = internships?.filter(
    (internship) => !internship?.students?.some((s) => s?.id === student?.id)
  );

  if (!mounted || !student) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center sm:text-left">
            Available Internships List
          </h1>
          <Link
            href={"/student/internships/appliedIntern"}
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-4 rounded-full text-sm sm:text-base whitespace-nowrap"
          >
            Applied Internships
          </Link>
        </div>

        <section className="py-4 sm:py-8">
          {filteredInternships?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredInternships.map((internship) => (
                  <div
                    key={internship?.id}
                    className="relative bg-white p-4 sm:p-6 rounded-xl shadow-md w-full"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold">
                        {internship?.profile?.length > 15
                          ? `${internship?.profile.substring(0, 15)}...`
                          : internship?.profile}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm px-2 py-1 rounded-full italic whitespace-nowrap ${
                          internship?.isActive
                            ? "bg-green-500 text-white"
                            : "bg-gray-500/50 cursor-none select-none text-white"
                        }`}
                      >
                        {internship?.isActive ? "Active" : "Close"}
                      </p>
                    </div>
                    <div className="space-y-2 mt-3 text-sm sm:text-base">
                      <p>
                        <strong>Type:</strong> {internship?.internshipType}
                      </p>
                      <p>
                        <strong>Openings:</strong> {internship?.openings}
                      </p>
                      <p>
                        <strong>Duration:</strong> {internship?.duration}{" "}
                        {internship?.duration > 1 ? "Months" : "Month"}
                      </p>
                      <p>
                        <strong>Stipend:</strong> ₹{internship?.stipendAmount}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mt-4">
                      {internship?.postedAt ? (
                        <TimeAgo timestamp={internship?.postedAt} />
                      ) : (
                        <p className="text-xs sm:text-sm text-black/50 italic flex gap-2 items-center">
                          <TimerResetIcon className="w-4 h-4" />
                          posted 30+ days ago
                        </p>
                      )}
                      <Link
                        href={`/student/internships/viewInternship?internshipId=${internship?.id}`}
                        className="w-full sm:w-auto text-center bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition text-sm sm:text-base"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-center text-base sm:text-lg text-gray-500 italic mt-20 sm:mt-60">
              🎓 No Internships available for you right now
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default InternshipsPage;
