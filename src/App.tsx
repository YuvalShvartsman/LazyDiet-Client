import { useEffect, useState } from 'react'

import './App.css'
import axios, { AxiosResponse } from 'axios'
import Login from './components/login/Login';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const something = async() =>{
      try{
      const respone:AxiosResponse =  (await axios.get("http://localhost:3000/users/allUsers"))
      const responeData:number= respone.data
      console.log(responeData)
      setCount(responeData)
    }
    catch(e){
      console.log(e)
    }
    }
    something()
  }, [])
  

  return (
    <>
<Login/>
    </>
  )
}

export default App
