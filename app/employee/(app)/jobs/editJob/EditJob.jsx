"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Sidebar from "@/components/globle/Sidebar";
import { toast } from "react-toastify";
import { createJob, updateJob } from "@/services/jobService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  assessmentsList,
  perksList,
  responsibilityList,
  skillsList
} from "@/utils/contents";

const predefinedOptions = {
  skills: skillsList,
  responsibility: responsibilityList,
  perks: perksList,
  assessments: assessmentsList
};

const EditJob = () => {
  const [errors, setErrors] = useState({});
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );
  const { job } = useSelector((state) => state.job);
  const selectedJob = job?.find((i) => i.id === jobId);

  console.log(job);

  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    employee: { id: employee?.id },
    profile: "",
    companyName: employee?.organizationName,
    jobType: "",
    openings: 0,
    startDate: "",
    experience: "",
    location: "",
    salaryStatus: "",
    salary: 0,
    skills: [],
    responsibility: [],
    perks: [],
    assessments: []
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEmployeeLoggedIn) {
      router.push("/");
    }
  }, [isEmployeeLoggedIn, mounted]);

  useEffect(() => {
    if (selectedJob) {
      setFormData({
        employee: { id: employee?.id },
        profile: selectedJob.profile || "",
        companyName: selectedJob.companyName || "",
        jobType: selectedJob.jobType || "",
        openings: selectedJob.openings || 0,
        startDate: selectedJob.startDate?.slice(0, 10) || "",
        location: selectedJob.location || "",
        experience: selectedJob.experience || "",
        salaryStatus: selectedJob.salaryStatus || "",
        salary: selectedJob.salary || 0,
        skills: selectedJob.skills || [],
        responsibility: selectedJob.responsibility || [],
        perks: selectedJob.perks || [],
        assessments: selectedJob.assessments || []
      });
    }
  }, [selectedJob]);

  if (!mounted || !employee) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      [field]: selectedOptions.map((opt) => opt.value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateJob(jobId, formData);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/jobs");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to create job.", {
        position: "bottom-right",
        autoClose: 2000
      });
      const backendErrors = error.response.data.data;
      const fieldErrors = {};
      for (const key in backendErrors) {
        if (backendErrors.hasOwnProperty(key)) {
          fieldErrors[key] = backendErrors[key];
        }
      }
      setErrors(fieldErrors);
    }
  };

  const renderSelectField = (label, field, options) => (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <CreatableSelect
        isMulti
        options={options.map((opt) => ({ value: opt, label: opt }))}
        onChange={(selected) => handleSelectChange(field, selected)}
        className="w-80"
      />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="ml-64 flex-1 p-10">
        <PathName />
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text">
            Update Job
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6 max-w-6xl mx-auto"
        >
          <div className="flex flex-wrap justify-between gap-5">
            <div>
              <label className="block font-medium mb-1">Profile (Role)</label>
              <input
                type="text"
                name="profile"
                value={formData.profile}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.profile && (
                <p className="text-red-500 text-sm mt-1">{errors.profile}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Openings</label>
              <input
                type="number"
                name="openings"
                value={formData.openings}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.openings && (
                <p className="text-red-500 text-sm mt-1">{errors.openings}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Salary Amount (PM)
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Experience</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-5">
            <div>
              <label className="block font-medium mb-1">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 text-black/70 "
              >
                <option value="">Select Job Type</option>
                {["Full_Time", "Part_Time"].map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Salary Status</label>
              <select
                name="salaryStatus"
                value={formData.salaryStatus}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 text-black/70"
              >
                <option value="">Select Salary Status</option>
                {["Fixed", "Negotiable", "Company_Standard"].map(
                  // Remove "Unpaid" to match backend validation
                  (status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  )
                )}
              </select>
              {errors.salaryStatus && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.salaryStatus}
                </p>
              )}
            </div>

            <div>
              {renderSelectField("Skills", "skills", predefinedOptions.skills)}
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
              )}
            </div>

            <div>
              {" "}
              {renderSelectField(
                "Responsibility",
                "responsibility",
                predefinedOptions.responsibility
              )}
              {errors.responsibility && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.responsibility}
                </p>
              )}
            </div>

            <div>
              {renderSelectField("Perks", "perks", predefinedOptions.perks)}
              {errors.perks && (
                <p className="text-red-500 text-sm mt-1">{errors.perks}</p>
              )}
            </div>

            <div>
              {renderSelectField(
                "Hiring Process",
                "assessments",
                predefinedOptions.assessments
              )}
              {errors.assessments && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.assessments}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-5 mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Update Job
            </button>
            <Link href={"/employee/jobs"}>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditJob;
