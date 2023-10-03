import { LOGIN, LOGOUT } from "../constants/actionTypes";
import jwt_decode from "jwt-decode";

const authReducer = (state = { userData: null }, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("i ni ni n nin in i" + action.payload);
      localStorage.setItem("@token", JSON.stringify({ ...action?.payload }));
      let user = jwt_decode(action?.payload);
      console.log(user);
      localStorage.setItem("@user", JSON.stringify(user));
      return { ...state, userData: user };
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};

export default authReducer;
