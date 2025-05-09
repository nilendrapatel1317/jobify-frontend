"use client";
import { useEffect, useState } from "react";
import { getAllInternships } from "@/services/internshipService";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";

export default function InternshipPage() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllInternships()
      .then((res) => {
        setInternships(res.data.data); // ⬅️ response structure from backend
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching internships:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="student" />
      <main className="ml-64 flex-1 p-10">
        <PathName />
        <h1 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
          All Internships
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading internships...</p>
        ) : internships.length === 0 ? (
          <p className="text-center text-red-500">No internships found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">{internship.profile}</h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Emp ID:</strong> {internship.employee?.id}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {internship.internshipType}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Duration:</strong> {internship.duration}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Openings:</strong> {internship.openings}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Stipend:</strong>{" "}
                  {internship.stipendStatus === "UNPAID"
                    ? "Unpaid"
                    : `₹${internship.stipendAmount}`}
                </p>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Skills Required:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {internship.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
