import axiosInstance from "@/utils/axiosInstance";

// Get all employees
export const getAllEmployees = () => axiosInstance.get('/employee/all');

// Add a new employee
export const registerEmployee = (employeeData) => axiosInstance.post('/employee/register', employeeData);

// Update a employee
export const updateEmployee = (id, updatedData) => axiosInstance.post(`/employee/update/${id}`, updatedData);

// Delete a employee
export const deleteEmployee = (id) => axiosInstance.delete(`/employee/delete/${id}`);

// Login (optional - depends on backend)
export const loginEmployee = (credentials) => axiosInstance.post('/employee/login', credentials);

export const logoutEmployee = (id) => axiosInstance.get(`/employee/logout/${id}`);

// Change Password
export const changePasswordEmployee = (id, { currentPassword, newPassword }) => {
  return axiosInstance.post(
    `/employee/changepassword/${id}?currentPassword=${currentPassword}`,
    { password: newPassword }
  );
};