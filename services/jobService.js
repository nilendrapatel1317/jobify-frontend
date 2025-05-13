import axiosInstance from "@/utils/axiosInstance";

// Get all Jobs
export const getAllJobs = () => axiosInstance.get("/job/all");

// Add a new Job
export const createJob = (jobData) =>
  axiosInstance.post("/job/create", jobData);

// Update a Job
export const updateJob = (id, updatedData) =>
  axiosInstance.post(`/job/update/${id}`, updatedData);

// Delete a Job
export const deleteJob = (id) => axiosInstance.delete(`/job/${id}`);

// Apply Job
export const applyJob = (jobId, studentId) => {
  return axiosInstance.post(`/job/apply`, {
    jobId,
    studentId
  });
};

// Withdraw I Job
export const withdrawJob = (jobId, studentId) => {
  return axiosInstance.post(`/job/withdraw`, {
    jobId,
    studentId
  });
};

// Activate Job
export const activateJob = (jobId) => {
  return axiosInstance.post(`/job/activate`, {
    jobId
  });
};

// Deactivate Job
export const deactivateJob = (jobId) => {
  return axiosInstance.post(`/job/deactivate`, {
    jobId
  });
};
