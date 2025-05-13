import api from "@/utils/axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// Create axios instance with baseURL
const api = axios.create({
  baseURL: API,
  withCredentials: true, // optional, if you're using cookies/session
});

// Get all students
export const getAllStudents = () => api.get("/student/all");

// Add a new student
export const registerStudent = (studentData) =>
  api.post("/student/register", studentData);

// Update a student
export const updateStudent = (id, updatedData) =>
  api.post(`/student/update/${id}`, updatedData);

// Login (optional - depends on backend)
export const loginStudent = (credentials) =>
  api.post("/student/login", credentials);

// Logout Student
export const logoutStudent = (id) => api.get(`/student/logout/${id}`);

// Forget Password
export const forgetPassword = () => api.post(`/student/forgetpassword/${id}`);

// Change Password
export const changePasswordStudent = (id, { currentPassword, newPassword }) => {
  return api.post(
    `/student/changepassword/${id}?currentPassword=${currentPassword}`,
    { password: newPassword }
  );
};


// Delete a student
export const deleteStudent = (id) => api.get(`/student/delete/${id}`);
