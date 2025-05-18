"use client";

import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Sidebar from "@/components/globle/Sidebar";
import { toast } from "react-toastify";
import { createJob } from "@/services/jobService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
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

const page = () => {
  const [errors, setErrors] = useState({});

  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    employee: { id: employee?.id },
    profile: "",
    companyName: employee?.organizationName,
    jobType: "",
    skills: [],
    openings: 0,
    startDate: "",
    experience: "",
    responsibility: [],
    location: "",
    salaryStatus: "",
    salary: 0,
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
      const response = await createJob(formData);
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Sidebar sidebarFor="employee" />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <PathName />
        <div className="flex justify-center items-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 text-transparent bg-clip-text text-center">
            Create Job
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Profile (Role)</label>
              <input
                type="text"
                name="profile"
                value={formData.profile}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="Enter Job Profile"
              />
              {errors.profile && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.profile}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Openings</label>
              <input
                type="number"
                name="openings"
                value={formData.openings}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.openings && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.openings}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Salary Amount (PM)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.salary && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.salary}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.startDate && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.startDate}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="Enter required experience"
              />
              {errors.experience && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
                placeholder="Enter job location"
              />
              {errors.location && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.location}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-black"
              >
                <option value="" className="text-black">Select Job Type</option>
                {["Full_Time", "Part_Time"].map((type) => (
                  <option key={type} value={type} className="text-black">
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.jobType}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Salary Status</label>
              <select
                name="salaryStatus"
                value={formData.salaryStatus}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-black"
              >
                <option value="" className="text-black">Select Salary Status</option>
                {["Fixed", "Negotiable", "Company_Standard"].map((status) => (
                  <option key={status} value={status} className="text-black">
                    {status.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.salaryStatus && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.salaryStatus}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Skills</label>
              <CreatableSelect
                isMulti
                options={predefinedOptions.skills.map((opt) => ({ value: opt, label: opt }))}
                onChange={(selected) => handleSelectChange("skills", selected)}
                className="text-sm sm:text-base text-black"
                classNamePrefix="select"
              />
              {errors.skills && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.skills}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Responsibility</label>
              <CreatableSelect
                isMulti
                options={predefinedOptions.responsibility.map((opt) => ({ value: opt, label: opt }))}
                onChange={(selected) => handleSelectChange("responsibility", selected)}
                className="text-sm sm:text-base text-black"
                classNamePrefix="select"
              />
              {errors.responsibility && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.responsibility}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Perks</label>
              <CreatableSelect
                isMulti
                options={predefinedOptions.perks.map((opt) => ({ value: opt, label: opt }))}
                onChange={(selected) => handleSelectChange("perks", selected)}
                className="text-sm sm:text-base text-black"
                classNamePrefix="select"
              />
              {errors.perks && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.perks}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Hiring Process</label>
              <CreatableSelect
                isMulti
                options={predefinedOptions.assessments.map((opt) => ({ value: opt, label: opt }))}
                onChange={(selected) => handleSelectChange("assessments", selected)}
                className="text-sm sm:text-base text-black"
                classNamePrefix="select"
              />
              {errors.assessments && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.assessments}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-5 mt-6 sm:mt-8">
            <Link href="/employee/jobs" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md text-sm sm:text-base transition-colors"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md text-sm sm:text-base transition-colors"
            >
              Create Job
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default page;
