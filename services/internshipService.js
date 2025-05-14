import api from "@/utils/axios";


// Get all Internships
export const getAllInternships = () => api.get("/internship/all");

// Add a new Internship
export const createInternship = (internshipData) =>
  api.post("/internship/create", internshipData);

// Update a Internship
export const updateInternship = (id, updatedData) =>
  api.post(`/internship/update/${id}`, updatedData);

// Delete a Internship
export const deleteInternship = (id) => api.delete(`/internship/${id}`);

// Apply Internship
export const applyInternship = (internshipId, studentId) => {
  return api.post(`/internship/apply`, {
    internshipId,
    studentId
  });
};

// Withdraw Internship
export const withdrawInternship = (internshipId, studentId) => {
  return api.post(`/internship/withdraw`, {
    internshipId,
    studentId
  });
};

// Activate Internship
export const activateInternship = (internshipId) => {
  return api.post(`/internship/activate`, {
    internshipId
  });
};

// Deactivate Internship
export const deactivateInternship = (internshipId) => {
  return api.post(`/internship/deactivate`, {
    internshipId
  });
};