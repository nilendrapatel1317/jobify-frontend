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

// UPDATE PROFILE
export const updateStudentProfile = (id, formData) => async (dispatch) => {
  try {
    const res = await updateStudent(id, formData);
    console.log(res)
    dispatch({ type: 'STUDENT_UPDATE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'STUDENT_UPDATE_FAILURE', payload: error.message });
    throw error;
  }
};

export const registerStudentAction = (formData) => async (dispatch) => {
  try {
    const res = await registerStudent(formData);
    dispatch({ type: "STUDENT_REGISTER_SUCCESS", payload: res.data.data });
  } catch (error) {
    dispatch({
      type: "STUDENT_REGISTER_FAILURE",
      payload: error.response?.data?.data || { message: error.message }
    });
    throw error;
  }
};
