import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import RerouteUserProvider from "./RerouteUserProvider";

import NotificationProvider from "./NotificationProvider";

import UserProvider from "../providers/UserProvider";

import LoadingProvider from "../providers/LoadingProvider";

import UserPreferencesProvider from "../providers/UserPreferencesProvider";

import Login from "../components/login/Login";
import UserPreferences from "../components/userPreferences/UserPreferences";
import HomePage from "../components/homePage/HomePage";

function RouteProvider() {
  const qClient = new QueryClient();
  return (
    <QueryClientProvider client={qClient}>
      <LoadingProvider>
        <NotificationProvider>
          <BrowserRouter>
            <UserProvider>
              <UserPreferencesProvider>
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
              </UserPreferencesProvider>
            </UserProvider>
          </BrowserRouter>
        </NotificationProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default RouteProvider;
