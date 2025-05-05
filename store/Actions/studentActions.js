import { loginStudent, registerStudent, updateStudent } from '@/services/studentService';

// LOGIN
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await loginStudent(credentials);
    dispatch({ type: 'STUDENT_LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'STUDENT_LOGIN_FAILURE', payload: error.message });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  dispatch({ type: 'STUDENT_LOGOUT' });
};

// DELETE Student
export const deleteProfile = () => (dispatch) => {
  dispatch({ type: 'STUDENT_DELETED' });
};

// UPDATE PROFILE
export const updateStudentProfile = (id, formData) => async (dispatch) => {
  try {
    const res = await updateStudent(id, formData);
    dispatch({ type: 'STUDENT_UPDATE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'STUDENT_UPDATE_FAILURE', payload: error.message });
    throw error;
  }
};

