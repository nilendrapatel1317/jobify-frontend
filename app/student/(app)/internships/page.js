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
        const data = response.data.data;
        dispatch({ type: "ALL_INTERNSHIPS_FETCHED_SUCCESS", payload: data });
        setInternships(data);
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error.message
        });
      }
    };
    fetchInternships();
  }, []);

  if (!mounted || !student) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"student"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Available Internships List
          </h1>
          <Link
            href={"/student/internships/appliedIntern"}
            className=" bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-3 rounded-full"
          >
            Applied Internships
          </Link>
        </div>

        <section className="py-8">
          {internships?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10">
            {internships?.map((internship) => (
              <div
                key={internship?.id}
                className="relative bg-white p-6 rounded-xl shadow-md max-w-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {" "}
                    {internship?.profile?.length > 15
                      ? `${internship.profile.substring(0, 15)}...`
                      : internship?.profile}
                  </h3>
                  <p
                    className={`text-sm px-2 py-1 rounded-full italic ${
                      internship?.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500/50 cursor-none select-none text-white"
                    }`}
                  >
                    {internship?.isActive ? "Active" : "Close"}
                  </p>
                </div>
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

                <div className="flex justify-between items-center mt-4">
                  {internship?.postedAt ? (
                    <TimeAgo timestamp={internship?.postedAt} />
                  ) : (
                    <p className="text-sm text-black/50 italic flex mt-3 gap-2 items-center">
                      <TimerResetIcon className="w-4 h-4" />
                      posted 30+ days ago
                    </p>
                  )}
                  <Link
                    href={`/student/internships/viewInternship?internshipId=${internship?.id}`}
                    className="inline-block bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Details
                  </Link>
                </div>

                {/* Write here your dynamic time tracking */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-500 italic">
          🎓 No Internships available for you right now
        </p>
      )}
        </section>
      </main>
    </div>
  );
};

export default InternshipsPage;
