import axiosInstance from "@/utils/axiosInstance";

// Get all students
export const getAllStudents = () => axiosInstance.get("/student/all");

// Add a new student
export const registerStudent = (studentData) =>
  axiosInstance.post("/student/register", studentData);

// Update a student
export const updateStudent = (id, updatedData) =>
  axiosInstance.post(`/student/update/${id}`, updatedData);

// Login (optional - depends on backend)
export const loginStudent = (credentials) =>
  axiosInstance.post("/student/login", credentials);

// Logout Student
export const logoutStudent = (id) => axiosInstance.get(`/student/logout/${id}`);

// Forget Password
export const forgetPassword = () => axiosInstance.post(`/student/forgetpassword/${id}`);

// Change Password
export const changePasswordStudent = (id, { currentPassword, newPassword }) => {
  return axiosInstance.post(
    `/student/changepassword/${id}?currentPassword=${currentPassword}`,
    { password: newPassword }
  );
};


// Delete a student
export const deleteStudent = (id) => axiosInstance.get(`/student/delete/${id}`);
