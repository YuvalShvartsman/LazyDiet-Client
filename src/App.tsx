import { useEffect, useState } from "react";

import "./App.css";
import axios, { AxiosResponse } from "axios";
import Login from "./components/login/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "828545353398-jhc8gosa7j782nj35cd1vtaieqkfjusi.apps.googleusercontent.com";

function App() {
  // const [count, setCount] = useState(0)

  // useEffect(() => {
  //   const something = async() =>{
  //     try{
  //     const respone:AxiosResponse =  (await axios.get("http://localhost:3000/users/allUsers"))
  //     const responeData:number= respone.data
  //     console.log(responeData)
  //     setCount(responeData)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  //   }
  //   something()
  // }, [])

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Login />
    </GoogleOAuthProvider>
  );
}

export default App;
