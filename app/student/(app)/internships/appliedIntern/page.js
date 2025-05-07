"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllInternships } from "@/services/internshipService";
import Link from "next/link";
import WithdrawInternButton from "@/components/Internship/WithdrawInternButton";

const page = () => {
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
            Applied Internships List
          </h1>
        </div>

        <section className="py-8">
          {internships?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow-md ">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    <th className="py-3 px-2 text-left">S.No</th>
                    <th className="py-3 px-2 text-left">Profile</th>
                    <th className="py-3 px-2 text-left">Intern Type</th>
                    <th className="py-3 px-2 text-left">Openings</th>
                    <th className="py-3 px-2 text-left">Duration</th>
                    <th className="py-3 px-2 text-left">Stipend Amount</th>
                    <th className="py-3 px-2 text-center">Status</th>
                    <th className="py-3 px-2 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {internships
                    ?.filter((internship) =>
                      internship.students?.some((s) => s.id === student.id)
                    )
                    .map((internship, index) => (
                      <tr
                        key={internship.id}
                        className="border-y hover:bg-gray-50 h-16"
                      >
                        <td className="py-2 px-2 text-lg">{index + 1}</td>
                        <td className="py-2 px-2 text-lg">{internship.profile}</td>
                        <td className="py-2 px-2 text-lg ">
                          {internship.internshipType}
                        </td>
                        <td className="py-2 px-2 text-lg">{internship.openings}</td>
                        <td className="py-2 px-2 text-lg">
                          {internship.duration}{" "}
                          {internship.duration > 1 ? "Months" : "Month"}
                        </td>
                        <td className="py-2 px-2 text-lg">
                          {internship.stipendStatus === "UNPAID"
                            ? "Unpaid"
                            : `₹${internship.stipendAmount}`}
                        </td>
                        <td className="text-center">
                          <span className="bg-green-500 px-3 py-1 rounded-full  text-white ">
                            Applied
                          </span>
                        </td>
                        <td className="text-center space-x-3">
                          <Link
                            href={`/student/internships/viewInternship?internshipId=${internship.id}`}
                          >
                            <button className="bg-blue-600 text-white px-3 py-1 rounded-full">
                              Details
                            </button>
                          </Link>
                          <WithdrawInternButton
                            internshipId={internship?.id}
                            onWithdraw={(id) => {
                              setInternships((prev) =>
                                prev.map((intern) =>
                                  intern?.id === id
                                    ? {
                                        ...intern,
                                        students: intern?.students?.filter(
                                          (s) => s?.id !== student?.id
                                        )
                                      }
                                    : intern
                                )
                              );
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
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

export default page;
