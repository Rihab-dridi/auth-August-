import { ERROR, GET_USER, LOGIN, LOGOUT, REGISTER } from "../action-types/action-types-auth";

const initialState = {
  user: null,
  isAuth: false,
  token: localStorage.getItem("token"),
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuth: true,
        ...action.payload,
      };
case LOGOUT:localStorage.removeItem("token")
return{
    ...state,
    isAuth:false,
    user:null ,
    token:null
}

case GET_USER: return{
...state,
isAuth:true,
user:action.payload
}
case ERROR:localStorage.removeItem("token")
return{
    ...state,
    isAuth:false,
    user:null ,
    token:null,
    error:action.payload
}
    default:
      return state;
  }
};
