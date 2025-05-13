import axiosInstance from "@/utils/axiosInstance";


// Get all Internships
export const getAllInternships = () => axiosInstance.get("/internship/all");

// Add a new Internship
export const createInternship = (internshipData) =>
  axiosInstance.post("/internship/create", internshipData);

// Update a Internship
export const updateInternship = (id, updatedData) =>
  axiosInstance.post(`/internship/update/${id}`, updatedData);

// Delete a Internship
export const deleteInternship = (id) => axiosInstance.delete(`/internship/${id}`);

// Apply Internship
export const applyInternship = (internshipId, studentId) => {
  return axiosInstance.post(`/internship/apply`, {
    internshipId,
    studentId
  });
};

// Withdraw Internship
export const withdrawInternship = (internshipId, studentId) => {
  return axiosInstance.post(`/internship/withdraw`, {
    internshipId,
    studentId
  });
};

// Activate Internship
export const activateInternship = (internshipId) => {
  return axiosInstance.post(`/internship/activate`, {
    internshipId
  });
};

// Deactivate Internship
export const deactivateInternship = (internshipId) => {
  return axiosInstance.post(`/internship/deactivate`, {
    internshipId
  });
};