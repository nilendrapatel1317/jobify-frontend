import api from '@/utils/axios';

// Get all employees
export const getAllEmployees = () => api.get('/employee/all');

// Add a new employee
export const registerEmployee = (employeeData) => api.post('/employee/register', employeeData);

// Update a employee
export const updateEmployee = (id, updatedData) => api.post(`/employee/update/${id}`, updatedData);

// Delete a employee
export const deleteEmployee = (id) => api.delete(`/employee/delete/${id}`);

// Login (optional - depends on backend)
export const loginEmployee = (credentials) => api.post('/employee/login', credentials);

export const logoutEmployee = (id) => api.get(`/employee/logout/${id}`);

// Change Password
export const changePasswordEmployee = (id, { currentPassword, newPassword }) => {
  return api.post(
    `/employee/changepassword/${id}?currentPassword=${currentPassword}`,
    { password: newPassword }
  );
};