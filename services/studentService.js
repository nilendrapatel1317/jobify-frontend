import api from '@/utils/axios';

// Get all students
export const getAllStudents = () => api.get('/student/all');

// Add a new student
export const registerStudent = (studentData) => api.post('/student/register', studentData);

// Update a student
export const updateStudent = (id, updatedData) => api.post(`/student/update/${id}`, updatedData);

// Delete a student
export const deleteStudent = (id) => api.delete(`/student/delete/${id}`);

// Login (optional - depends on backend)
export const loginStudent = (credentials) => api.post('/student/login', credentials);

export const logoutStudent = (id) => api.get(`/student/logout/${id}`);