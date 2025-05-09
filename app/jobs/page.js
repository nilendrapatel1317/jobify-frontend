"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/globle/Sidebar";
import PathName from "@/components/globle/PathName";
import { getAllJobs } from "@/services/jobService";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setJobs(res.data.data); // ⬅️ response structure from backend
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
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
          All Jobs
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-red-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-purple-700 mb-2">
                  {job.profile}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Emp ID:</strong> {job.employee?.id}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Company Name:</strong> {job?.companyName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {job.jobType}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Start Date:</strong> {job.startDate}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Experience:</strong> {job.experience}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Openings:</strong> {job.openings}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>CTC:</strong>
                  {` ₹${job.salary} /-`}
                </p>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Skills Required:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {job.skills?.map((skill, index) => (
                      <li key={index}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Responsibility:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {job.responsibility?.map((res, index) => (
                      <li key={index}>{res}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Perks:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {job.perks?.map((perk, index) => (
                      <li key={index}>{perk}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <p className="font-medium text-gray-700">Assessments:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {job.assessments?.map((assessment, index) => (
                      <li key={index}>{assessment}</li>
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
