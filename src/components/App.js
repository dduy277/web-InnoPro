import React from "react"
import Signup from "./authentication/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./authentication/Login"
import PrivateRoute from "./authentication/PrivateRoute"
import ForgotPassword from "./authentication/ForgotPassword"
import UpdateProfile from "./authentication/UpdateProfile"
import AddProducts from "./Addproduct.js"

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Routes>
              {/* Products */}
              <Route path="/add-products" element={<AddProducts />} />

              {/* Profile/user */}
              <Route path="/user" element={<PrivateRoute><Dashboard /></PrivateRoute>} ></Route>
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} ></Route>

              {/* Auth */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
