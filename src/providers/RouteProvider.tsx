import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import LoadingProvider from "../providers/LoadingProvider";
import NotificationProvider from "./NotificationProvider";
import UserPreferencesProvider from "../providers/UserPreferencesProvider";
import UserProvider from "../providers/UserProvider";
import MealsProvider from "./MealsProvider";
import HomeDisplayProvider from "./HomeDisplayProvider";
import RerouteUserProvider from "./RerouteUserProvider";

import Login from "../components/login/Login";
import UserPreferences from "../components/userPreferences/UserPreferences";
import HomePage from "../components/homePage/HomePage";
import MenuProvider from "./MenuProvider";

function RouteProvider() {
  const qClient = new QueryClient();
  return (
    <QueryClientProvider client={qClient}>
      <LoadingProvider>
        <NotificationProvider>
          <BrowserRouter>
            <UserPreferencesProvider>
              <UserProvider>
                <MealsProvider>
                  <MenuProvider>
                    <HomeDisplayProvider>
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
                    </HomeDisplayProvider>
                  </MenuProvider>
                </MealsProvider>
              </UserProvider>
            </UserPreferencesProvider>
          </BrowserRouter>
        </NotificationProvider>
      </LoadingProvider>
    </QueryClientProvider>
  );
}

export default RouteProvider;
