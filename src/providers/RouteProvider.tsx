import { UserProvider } from "../contexts/UserContext";
import { UserPreferencesProvider } from "../contexts/UserPreferencesContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "../components/homePage/HomePage";
import Login from "../components/login/Login";
import UserPreferences from "../components/userPreferences/UserPreferences";
import RerouteUserProvider from "./RerouteUserProvider";
import NotificationProvider from "./NotificationProvider";
import { LoadingProvider } from "../contexts/LoadingContext";

function RouteProvider() {
  return (
    <NotificationProvider>
      <LoadingProvider>
        <UserProvider>
          <UserPreferencesProvider>
            <BrowserRouter>
              <RerouteUserProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/userPreferences"
                    element={<UserPreferences />}
                  />
                </Routes>
              </RerouteUserProvider>
            </BrowserRouter>
          </UserPreferencesProvider>
        </UserProvider>
      </LoadingProvider>
    </NotificationProvider>
  );
}

export default RouteProvider;
