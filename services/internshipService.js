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
