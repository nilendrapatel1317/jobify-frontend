"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllInternships } from "@/services/internshipService";
import Link from "next/link";

const InternshipsPage = () => {
  const router = useRouter();
  const { isStudentLoggedIn, student } = useSelector((state) => state.student);
  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const dispatch = useDispatch();

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
        <div className="flex justify-between items-center ">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Avaliable Internships List
          </h1>
        </div>

        <section className="py-8">
          {internships.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10">
                {internships.map((internship) => (
                  <div
                    key={internship.id}
                    className="bg-white p-6 rounded-xl shadow-md max-w-sm"
                  >
                    <h3 className="text-2xl font-bold">{internship.profile}</h3>
                    <p>
                      <strong>Type:</strong> {internship.internshipType}
                    </p>
                    <p>
                      <strong>Openings:</strong> {internship.openings}
                    </p>
                    <p>
                      <strong>Duration:</strong> {internship.duration} months
                    </p>
                    <p>
                      <strong>Stipend:</strong> ₹{internship.stipendAmount}
                    </p>
                    <div className="flex justify-end mt-1">
                      <Link
                        href={`/student/internships/viewInternship?internshipId=${internship.id}`}
                        className="mt-4 inline-block bg-blue-400 text-white px-4 py-2 rounded-lg font-semibold transition"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center text-lg text-gray-500 italic">
              🎓 No Internships added right now
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default InternshipsPage;
