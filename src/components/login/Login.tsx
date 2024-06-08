import "./Login.css";

import { useContext, useEffect } from "react";

import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import { User } from "../../types/User";

import db from "../../axiosConfig/axiosInstance";
import { URLS } from "../../axiosConfig/URLS";

import UserContext from "../../contexts/UserContext";

import IdleAvocado from "/idleAvocado.gif";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

type SignInRes = {
  user: User;
  token: string;
};

function Login() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const { updateUser, user } = userContext;

  // useEffect(() => {
  //   if (user) navigate("/");
  // }, [userContext]);

  useEffect(() => {
    updateUser("amogus");
  }, []);

  const handleSuccess = async (response: GoogleCredentialResponse) => {
    try {
      const res = await db.post<SignInRes>(URLS.SIGN_IN, {
        token: response.credential,
      });
      updateUser(res.data.token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "System Error",
        text: "There was an error with your Login",
        icon: "error",
      });
      console.error("Error sending token to server:", error);
    }
  };

  const handleFailure = (error: any) => {
    console.log("Login Failed:", error);
  };

  return (
    // <GoogleOAuthProvider clientId="828545353398-jhc8gosa7j782nj35cd1vtaieqkfjusi.apps.googleusercontent.com">
    <div className="Login-Screen">
      <img src={IdleAvocado} className="Login-Logo" />
      <h2>Login with Google</h2>
      {/* <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => handleFailure}
          theme="filled_black"
          shape="circle"
        /> */}
    </div>
    // </GoogleOAuthProvider>
  );
}

export default Login;
