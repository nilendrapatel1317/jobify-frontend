"use client";
import { getAllInternships } from "@/services/internshipService";
import { Timer, TimerResetIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TimeAgo from "../globle/TimeAgo";

const RenderInternshipCards = ({ from }) => {
  const [internships, setInternships] = useState([]);
  const dispatch = useDispatch();
  const { isStudentLoggedIn, student } = useSelector((state) => state?.student);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await getAllInternships();
        const data = response?.data?.data;

        dispatch({ type: "ALL_INTERNSHIPS_FETCHED_SUCCESS", payload: data });

        // Step 1: Filter internships not applied by the current student
        const notAppliedInternships = data?.filter(
          (internship) =>
            !internship?.students?.some((s) => s?.id === student?.id)
        );

        // Step 2: Show 3 or 6 based on 'from'
        const count = from === "student" ? 3 : 6;
        setInternships(notAppliedInternships?.slice(0, count));
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error?.message
        });
      }
    };

    fetchInternships();
  }, [from, dispatch, student?.id]);

  return (
    <section className="py-4 lg:py-8">
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 lg:mb-6 px-4 lg:px-0">
        Latest Internships
      </h3>

      {internships?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4 lg:px-0">
            {internships?.map((internship) => (
              <div
                key={internship?.id}
                className="relative bg-white text-black p-4 lg:p-6 rounded-xl shadow-md w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl lg:text-2xl font-bold text-black">
                    {internship?.profile?.length > 15
                      ? `${internship?.profile.substring(0, 15)}...`
                      : internship?.profile}
                  </h3>
                  <p
                    className={`text-sm px-2 py-1 rounded-full italic ${
                      internship?.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500/50 cursor-none select-none text-white"
                    }`}
                  >
                    {internship?.isActive ? "Active" : "InActive"}
                  </p>
                </div>
                <div className="space-y-2 text-black">
                  <p className="text-sm lg:text-base">
                    <strong>Type:</strong> {internship?.internshipType}
                  </p>
                  <p className="text-sm lg:text-base">
                    <strong>Openings:</strong> {internship?.openings}
                  </p>
                  <p className="text-sm lg:text-base">
                    <strong>Duration:</strong> {internship?.duration}{" "}
                    {internship?.duration > 1 ? "Months" : "Month"}
                  </p>
                  <p className="text-sm lg:text-base">
                    <strong>Stipend:</strong> ₹{internship?.stipendAmount}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">
                  {internship?.postedAt ? (
                    <TimeAgo timestamp={internship?.postedAt} />
                  ) : (
                    <p className="text-xs lg:text-sm text-black italic flex mt-3 gap-2 items-center">
                      <TimerResetIcon className="w-4 h-4" />
                      posted 30+ days ago
                    </p>
                  )}
                  <Link
                    href={`/student/internships/viewInternship?internshipId=${internship?.id}`}
                    className="inline-block bg-blue-400 text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base font-semibold transition hover:bg-blue-500"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-8">
            <Link
              href={
                isStudentLoggedIn
                  ? "/student/internships"
                  : "/student/auth/login"
              }
              className="bg-blue-600 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg hover:bg-blue-700 font-semibold transition text-sm lg:text-base"
            >
              View More Internships
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-base lg:text-lg text-gray-500 italic px-4 lg:px-0">
          🎓 No Internships available for you right now
        </p>
      )}
    </section>
  );
};

export default RenderInternshipCards;
