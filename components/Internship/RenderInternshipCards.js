"use client";
import { getAllInternships } from "@/services/internshipService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RenderInternshipCards = ({ from }) => {
  const [internships, setInternships] = useState([]);
  const dispatch = useDispatch();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await getAllInternships();
        const data = response?.data.data;

        dispatch({ type: "ALL_INTERNSHIPS_FETCHED_SUCCESS", payload: data });

        // Step 1: Filter internships not applied by the current student
        const notAppliedInternships = data.filter(
          (internship) =>
            !internship?.students?.some((s) => s?.id === student?.id)
        );

        // Step 2: Show 3 or 6 based on 'from'
        const count = from === "student" ? 3 : 6;
        setInternships(notAppliedInternships.slice(0, count));
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error?.message,
        });
      }
    };

    fetchInternships();
  }, [from, dispatch, student?.id]);

  return (
    <section className="py-8">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">
        Latest Internships
      </h3>

      {internships?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10">
            {internships?.map((internship) => (
              <div
                key={internship?.id}
                className="relative bg-white p-6 rounded-xl shadow-md max-w-sm"
              >
                <h3 className="text-2xl font-bold">{internship?.profile}</h3>
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
                  <div className="bg-gray-100 text-gray-600 flex justify-center items-center px-3 py-1 rounded-full">
                    Apply Now
                  </div>
                  <Link
                    href={`/student/internships/viewInternship?internshipId=${internship?.id}`}
                    className="inline-block bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href={
                isStudentLoggedIn
                  ? "/student/internships"
                  : "/student/auth/login"
              }
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
            >
              View More Internships
            </Link>
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-gray-500 italic">
          🎓 No Internships available for you right now
        </p>
      )}
    </section>
  );
};

export default RenderInternshipCards;
