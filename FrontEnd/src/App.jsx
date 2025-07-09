import { BrowserRouter as Router, Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import { UserProvider, useUser } from "./context/userContext";
import LoginPage from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import { Spin } from 'antd';
import ForgotPassword from "./pages/ForgotPassword";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return <Spin style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh"
    }}></Spin>; // Hoặc spinner
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
