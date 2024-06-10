import "./Login.css";

import { useContext, useEffect } from "react";

import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import { User } from "../../types/User";

import { URLS } from "../../axiosConfig/URLS";

import UserContext from "../../contexts/UserContext";

import IdleAvocado from "/idleAvocado.gif";

import Swal from "sweetalert2";
import { useSendApiReq } from "../../hooks/useSendApiReq";

type SignInRes = {
  user: User;
  token: string;
};

function Login() {
  const userContext = useContext(UserContext);
  const { request } = useSendApiReq<SignInRes>();
  const { updateUser } = userContext;

  const handleSuccess = async (response: GoogleCredentialResponse) => {
    console.log("hai");
    try {
      const res = (
        await request({
          url: URLS.SIGN_IN,
          method: "POST",
          data: {
            token: response.credential,
          },
        })
      ).data;
      if (res) updateUser(res.token);
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
    <GoogleOAuthProvider clientId="828545353398-jhc8gosa7j782nj35cd1vtaieqkfjusi.apps.googleusercontent.com">
      <div className="Login-Screen">
        <img src={IdleAvocado} className="Login-Logo" />
        <h2>Login with Google</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => handleFailure}
          theme="filled_black"
          shape="circle"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
