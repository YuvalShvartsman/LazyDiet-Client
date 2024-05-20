import { GoogleOAuthProvider } from '@react-oauth/google';

function Login() {
    return (
        <GoogleOAuthProvider clientId="your-client-id">
          {/* Your app components go here */}
        </GoogleOAuthProvider>
      );
}

export default Login