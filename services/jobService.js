import api from "@/utils/axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API,
  withCredentials: true, // optional, if you're using cookies/session
});

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

// Activate Job
export const activateJob = (jobId) => {
  return api.post(`/job/activate`, {
    jobId
  });
};

// Deactivate Job
export const deactivateJob = (jobId) => {
  return api.post(`/job/deactivate`, {
    jobId
  });
};
