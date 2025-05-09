import api from "@/utils/axios";

// Get all Jobs
export const getAllJobs = () => api.get("/job/all");

// Add a new Job
export const createJob = (jobData) =>
  api.post("/job/create", jobData);

// Update a Job
export const updateJob = (id, updatedData) =>
  api.post(`/job/update/${id}`, updatedData);

// Delete a Job
export const deleteJob = (id) => api.delete(`/job/${id}`);

// Apply Job
export const applyJob = (jobId, studentId) => {
  return api.post(`/job/apply`, {
    jobId,
    studentId
  });
};

// Withdraw I Job
export const withdrawJob = (jobId, studentId) => {
  return api.post(`/job/withdraw`, {
    jobId,
    studentId
  });
};
