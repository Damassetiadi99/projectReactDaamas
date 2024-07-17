import axios from "axios";

export const login = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_LOGIN_PENDING' });

    const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, data);

    const { token, photo, id, username } = result.data.users;

    localStorage.setItem("token", token);
    localStorage.setItem('photo', photo);
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);

    dispatch({ payload: result.data.users, type: 'AUTH_LOGIN_SUCCESS' });
    
    navigate('/menu');
  } catch (error) {
    dispatch({ payload: error.response.data.message, type: 'AUTH_LOGIN_FAILED' });
  }
};

export const register = (data, navigate) => async (dispatch) => {
  try {
    dispatch({ type: 'AUTH_REGISTER_PENDING' });

    const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, data);

    dispatch({ payload: result.data.users, type: 'AUTH_REGISTER_SUCCESS' });
    
    navigate('/login');
  } catch (error) {
    dispatch({ payload: error.response.data.message, type: 'AUTH_REGISTER_FAILED' });
  }
};
