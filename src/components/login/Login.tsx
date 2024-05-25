import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { CookiesProvider, useCookies } from "react-cookie";

interface DecodedToken {
  username: string;
  exp: number;
  iat: number;
}

axios.defaults.withCredentials = true;
const clientId =
  "828545353398-jhc8gosa7j782nj35cd1vtaieqkfjusi.apps.googleusercontent.com";

function Login() {
  const [user, setUser] = useState<string>("");
  const [cookies, setCookies] = useCookies(["token"]);

  console.log(cookies);

  useEffect(() => {
    console.log("useEffect started");

    const realAssACookei = document.cookie;
    const token = Cookies.get("token");
    console.log("token:", token);

    console.log("document cookie is - ", realAssACookei);
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        setUser(decodedToken.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.log("Token not found. Waiting for it to be set...");
    }
    console.log("useEffect finished");
  }, [cookies]); // Trigger useEffect when the token changes

  console.log("User:", user);

  const handleSuccess = async (response: any) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/google-signIn",
        {
          token: response.credential,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Server Response:", res.data); // Should print the user and token
      setCookies("token", res.data.token);
      // Cookies.set("token", res.data.token, { expires: 7, secure: true }); // Set the token in the cookie
    } catch (error) {
      console.error("Error sending token to server:", error);
    }
  };

  const handleFailure = (error: any) => {
    console.log("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={() => handleFailure} />
        <h1>{user ? <p>Welcome, {user}</p> : <p>nothing</p>}</h1>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
