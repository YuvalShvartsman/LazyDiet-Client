import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const handleSuccess = async (response: any) => {
    console.log("Login Success:", response.credential);
    // Send the token to the backend server
    axios
      .post("http://localhost:3000/users/google-signIn", {
        token: response.credential,
      })
      .then((res) => {
        console.log("Server Response:", res.data);
        // Handle response from server
      })
      .catch((error) => {
        console.error("Error sending token to server:", error);
      });
  };

  const handleFailure = (error: any) => {
    console.log("Login Failed:", error);
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLogin onSuccess={handleSuccess} onError={() => handleFailure} />
    </div>
  );
}

export default Login;
