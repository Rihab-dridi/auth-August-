import axios from "axios";
import {
  ERROR,
  GET_USER,
  LOGIN,
  LOGOUT,
  REGISTER,
} from "../action-types/action-types-auth";

export const registerHandler = (newUser) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/register",
      newUser
    );
    dispatch({
      type: REGISTER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginHandler = (authUser) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/login",
      authUser
    );
    dispatch({
      type: LOGIN,
      payload: res.data,
    });
  } catch (error) {
    console.dir(error);

    const errorMsg = error.response.data.msg;
    dispatch({
      type: ERROR,
      payload: errorMsg,
    });
  }
};

export const logoutHandler = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserHandler = () => async (dispatch) => {
  const config = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.get(
      "http://localhost:5000/api/user/profile",
      config
    );
    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
