import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import Login from "./components/login/Login";
import HomePage from "./components/homePage/HomePage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
