import { UserProvider } from "../contexts/UserContext";
import { UserPreferencesProvider } from "../contexts/UserPreferencesContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../components/homePage/HomePage";
import Login from "../components/login/Login";
import UserPreferences from "../components/userPreferences/UserPreferences";
import UserDataCheckProvider from "./UserDataCheckProvider";

function RouteProvider() {
  return (
    <UserProvider>
      <UserPreferencesProvider>
        <BrowserRouter>
          <UserDataCheckProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/userPreferences" element={<UserPreferences />} />
            </Routes>
          </UserDataCheckProvider>
        </BrowserRouter>
      </UserPreferencesProvider>
    </UserProvider>
  );
}

export default RouteProvider;
