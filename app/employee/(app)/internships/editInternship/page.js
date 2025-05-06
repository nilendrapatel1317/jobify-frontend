"use client";

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

const predefinedOptions = {
  skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Bootstrap"],
  responsibility: [
    "Build Restful APIs",
    "Build Spring Boot application",
    "Write clean code"
  ],
  perks: ["Certificate", "Letter of Recommendation", "Flexible Hours"],
  assesments: ["Aptitude Test", "Technical Interview"]
};

const page = () => {
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
    assesments: []
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
        assesments: selectedInternship.assesments || []
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
            Update Internship
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
              <label className="block font-medium mb-1">Stipend Amount</label>
              <input
                type="number"
                name="stipendAmount"
                value={formData.stipendAmount}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">From Date</label>
              <input
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">To Date</label>
              <input
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">
                Duration (in months)
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2"
              />
              {errors.fromDate && (
                <p className="text-red-500 text-sm mt-1">{errors.fromDate}</p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-between gap-5">
            <div>
              <label className="block font-medium mb-1">Internship Type</label>
              <select
                name="internshipType"
                value={formData.internshipType}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 text-black/70 "
              >
                <option value="">Select Internship Type</option>
                {["Onsite", "Remote", "Hybrid"].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.internshipType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.internshipType}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-1">Stipend Status</label>
              <select
                name="stipendStatus"
                value={formData.stipendStatus}
                onChange={handleChange}
                className="w-80 border border-gray-300 rounded-lg px-4 py-2 text-black/70"
              >
                <option value="">Select Stipend Status</option>
                {["Fixed", "Negotiable", "Performance_Based", "Unpaid"].map(
                  (status) => (
                    <option key={status} value={status}>
                      {status.replace("_", " ")}
                    </option>
                  )
                )}
              </select>
              {errors.stipendStatus && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.stipendStatus}
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
              {renderSelectField(
                "Hiring Process",
                "assesments",
                predefinedOptions.assesments
              )}
              {errors.assesments && (
                <p className="text-red-500 text-sm mt-1">{errors.assesments}</p>
              )}
            </div>

            <div>
              {renderSelectField("Perks", "perks", predefinedOptions.perks)}
              {errors.perks && (
                <p className="text-red-500 text-sm mt-1">{errors.perks}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-5 mt-10">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Update Internship
            </button>
            <Link href={"/employee/internships"}>
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

export default page;
