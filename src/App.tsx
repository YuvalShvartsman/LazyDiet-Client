import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";

import HomePage from "./components/homePage/HomePage";
import Login from "./components/login/Login";
import UserPreferences from "./components/userPreferences/UserPreferences";

function App() {
  return (
    <UserProvider>
      <UserPreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userPreferences" element={<UserPreferences />} />
          </Routes>
        </BrowserRouter>
      </UserPreferencesProvider>
    </UserProvider>
  );
}

export default App;
