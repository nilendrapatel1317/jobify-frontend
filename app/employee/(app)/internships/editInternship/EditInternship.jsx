"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Sidebar from "@/components/globle/Sidebar";
import { toast } from "react-toastify";
import {
  createInternship,
  updateInternship
} from "@/services/internshipService";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PathName from "@/components/globle/PathName";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { assessmentsList, perksList, responsibilityList, skillsList } from "@/utils/contents";

const predefinedOptions = {
  skills: skillsList,
  responsibility: responsibilityList,
  perks: perksList,
  assessments: assessmentsList
};

const EditInternship = () => {
  const [errors, setErrors] = useState({});
  const searchParams = useSearchParams();
  const internshipId = searchParams.get("internshipId");

  const router = useRouter();
  const { isEmployeeLoggedIn, employee } = useSelector(
    (state) => state.employee
  );
  const { internship } = useSelector((state) => state.internship);
  const selectedInternship = internship?.find((i) => i.id === internshipId);

  console.log(internship);

  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    employee: { id: employee?.id },
    profile: "",
    skills: [],
    internshipType: "",
    openings: 0,
    fromDate: "",
    toDate: "",
    duration: "",
    responsibility: [],
    stipendStatus: "",
    stipendAmount: 0,
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
    if (selectedInternship) {
      setFormData({
        employee: { id: employee?.id },
        profile: selectedInternship.profile || "",
        skills: selectedInternship.skills || [],
        internshipType: selectedInternship.internshipType || "",
        openings: selectedInternship.openings || 0,
        fromDate: selectedInternship.fromDate?.slice(0, 10) || "",
        toDate: selectedInternship.toDate?.slice(0, 10) || "",
        duration: selectedInternship.duration || "",
        responsibility: selectedInternship.responsibility || [],
        stipendStatus: selectedInternship.stipendStatus || "",
        stipendAmount: selectedInternship.stipendAmount || 0,
        perks: selectedInternship.perks || [],
        assessments: selectedInternship.assessments || []
      });
    }
  }, [selectedInternship]);

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
      const response = await updateInternship(internshipId, formData);
      toast.success(response.data.msg, {
        position: "bottom-right",
        autoClose: 2000
      });
      router.push("/employee/internships");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Failed to create internship.", {
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
      <label className="block text-black font-medium mb-1">{label}</label>
      <CreatableSelect
        isMulti
        options={options.map((opt) => ({ value: opt, label: opt }))}
        onChange={(selected) => handleSelectChange(field, selected)}
        className="w-80 text-black"
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
            Update Internship
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
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Stipend Amount</label>
              <input
                type="number"
                name="stipendAmount"
                value={formData.stipendAmount}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.stipendAmount && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.stipendAmount}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fromDate}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.toDate && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.toDate}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Duration (in months)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border text-black border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base"
              />
              {errors.duration && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.duration}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Internship Type</label>
              <select
                name="internshipType"
                value={formData.internshipType}
                onChange={handleChange}
                className="w-full border  border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-black"
              >
                <option value="" className="text-black">Select Internship Type</option>
                {["Onsite", "Remote", "Hybrid"].map((type) => (
                  <option className="text-black" key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.internshipType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.internshipType}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-black font-medium mb-1 text-sm sm:text-base">Stipend Status</label>
              <select
                name="stipendStatus"
                value={formData.stipendStatus}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-black"
              >
                <option value="">Select Stipend Status</option>
                {["Fixed", "Negotiable", "Performance_Based", "Unpaid"].map((status) => (
                  <option className="text-black" key={status} value={status}>
                    {status.replace("_", " ")}
                  </option>
                ))}
              </select>
              {errors.stipendStatus && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.stipendStatus}</p>
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
                value={formData.skills.map(skill => ({ value: skill, label: skill }))}
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
                value={formData.responsibility.map(resp => ({ value: resp, label: resp }))}
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
                value={formData.perks.map(perk => ({ value: perk, label: perk }))}
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
                value={formData.assessments.map(assessment => ({ value: assessment, label: assessment }))}
              />
              {errors.assessments && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.assessments}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-5 mt-6 sm:mt-8">
            <Link href="/employee/internships" className="w-full sm:w-auto">
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
              Update Internship
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditInternship;
