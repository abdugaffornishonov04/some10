import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import LoginRedirect from "./pages/LoginRedirect";
import AdminLayout from "./constants/layout/AdminLayout";

import { ISLOGGEDIN } from "./constants";
import TeachersPage from "./pages/TeachersPage";
import StudentsPage from "./pages/StudentsPage";


function App() {
  let [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem(ISLOGGEDIN))
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        {isLoggedIn ? (
          <Route element={<AdminLayout/>}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="teachers" element={<TeachersPage />} />
            <Route path="students" element={<StudentsPage />} />
          </Route>
        ) : null}

        <Route path="*" element={<LoginRedirect />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
