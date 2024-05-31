import { useContext } from "react";

import {
  GoogleCredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";

import { User } from "../../types/User";

import db from "../../axiosConfig/axiosInstance";
import { URLS } from "../../axiosConfig/URLS";

import UserContext from "../../contexts/UserContext";

function Login() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useContext must be used within a UserProvider");
  }

  const { user, updateUser } = userContext;

  const handleSuccess = async (response: GoogleCredentialResponse) => {
    try {
      const res = await db.post<{ user: User; token: string }>(URLS.SIGN_IN, {
        token: response.credential,
      });
      updateUser(res.data.token);
    } catch (error) {
      console.error("Error sending token to server:", error);
    }
  };

  const handleFailure = (error: any) => {
    console.log("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId="828545353398-jhc8gosa7j782nj35cd1vtaieqkfjusi.apps.googleusercontent.com">
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={() => handleFailure} />
        <h1>{user ? <p>Welcome, {user.name}</p> : <p>nothing</p>}</h1>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
