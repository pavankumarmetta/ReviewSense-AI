import {
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";

import Analyzer from "./pages/Analyzer";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* PROTECTED ANALYZER */}
      <Route
        path="/analyzer"
        element={
          <ProtectedRoute>

            <Analyzer />

          </ProtectedRoute>
        }
      />

      {/* PROTECTED DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;