import { loginEmployee, registerEmployee, updateEmployee } from '@/services/employeeService';

// LOGIN
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await loginEmployee(credentials);
    dispatch({ type: 'EMPLOYEE_LOGIN_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'EMPLOYEE_LOGIN_FAILURE', payload: error.message });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  dispatch({ type: 'EMPLOYEE_LOGOUT' });
};

// DELETE
export const deleteProfile = () => (dispatch) => {
  dispatch({ type: 'EMPLOYEE_DELETE' });
};

// UPDATE PROFILE
export const updateEmployeeProfile = (id, formData) => async (dispatch) => {
  try {
    const res = await updateEmployee(id, formData);
    dispatch({ type: 'EMPLOYEE_UPDATE_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'EMPLOYEE_UPDATE_FAILURE', payload: error.message });
    throw error;
  }
};

