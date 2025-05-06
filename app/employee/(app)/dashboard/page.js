"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllInternships } from "@/services/internshipService";

const dummyInternships = [
  { id: 1, title: "Frontend Intern at ABC Corp" },
  { id: 2, title: "Backend Intern at XYZ Ltd" },
  { id: 3, title: "UI/UX Intern at DesignCo" }
];

const dummyJobs = [
  { id: 1, title: "Java Developer at TechSoft" },
  { id: 2, title: "React Developer at CodeBase" },
  { id: 3, title: "Full Stack Developer at DevCorp" }
];

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );

  const [mounted, setMounted] = useState(false);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isEmployeeLoggedIn) {
      router.push("/employee/auth/login");
    }
  }, [mounted, isEmployeeLoggedIn]);

  useEffect(() => {
    const fetchAllInternships = async () => {
      try {
        const response = await getAllInternships();
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_SUCCESS",
          payload: response.data.data
        });
        const allInternships = response.data.data || [];

        const filteredInternships = allInternships.filter(
          (internship) => internship.employee?.id === employee?.id
        );

        setInternships(filteredInternships);
        setLoading(false);
      } catch (error) {
        dispatch({
          type: "ALL_INTERNSHIPS_FETCHED_FAILED",
          payload: error.message
        });
        console.error("Error fetching internships:", error);
        setLoading(false);
      }
    };

    if (mounted && employee?.id) {
      fetchAllInternships();
    }
  }, [mounted, employee]);

  // Avoid hydration mismatch by only rendering after mounted
  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor={"employee"} />

      <main className="ml-64 flex-1 p-8">
        <PathName />
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Welcome, {employee?.firstname}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl">Total Internships Created</h2>
            <p className="text-3xl font-bold">{internships.length}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl">Total Jobs Created</h2>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Internships created by You
          </h2>
          {/* <div className="space-y-4">
            {dummyInternships.map((intern) => (
              <div
                key={intern.id}
                className="bg-white p-4 rounded shadow border"
              >
                <h3 className="text-lg font-semibold">{intern.title}</h3>
                <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Apply
                </button>
              </div>
            ))}
          </div> */}

          <p>Not Available</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Jobs created by you</h2>
          {/* <div className="space-y-4">
            {dummyJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded shadow border">
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <button className="mt-2 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                  Apply
                </button>
              </div>
            ))}
          </div> */}
          <p>Not Available</p>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
