import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { UserProvider } from "./contexts/UserContext";

import Login from "./components/login/Login";
import HomePage from "./components/homePage/HomePage";
import { UserPreferencesProvider } from "./contexts/UserPreferencesContext";

function App() {
  return (
    <UserProvider>
      <UserPreferencesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userPreferences" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserPreferencesProvider>
    </UserProvider>
  );
}

export default App;
