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
import AddProducts from "./Product/AddProduct.js"
import DeleteProducts from "./Product/DeleteProduct.js"
import UptateProducts from "./Product/UptateProducts.js"
import Home from "./Home.js"
import AdminRoute from "./authentication/Admin/AdminRoute.js"
import AdminUpdateProfile from "./authentication/Admin/AdminUpdateProfile"

function App() {
  return (
    /*     <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        > */
    //<div className="w-100" style={{ maxWidth: "400px" }}>
    <Router>
      <AuthProvider>
        <Routes>
          {/* Home */}
          <Route exact path="/" element={<Home />} />

          {/* Products */}
          <Route path="/add-products" element={<PrivateRoute><AddProducts /></PrivateRoute>} />
          <Route path="/delete-products" element={<PrivateRoute><DeleteProducts /></PrivateRoute>} />
          <Route path="/update-products" element={<PrivateRoute><UptateProducts /></PrivateRoute>} />

          {/* Profile/user */}
          <Route path="/user" element={<PrivateRoute><Dashboard /></PrivateRoute>} ></Route>
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} ></Route>
          <Route path="/admin/update-profile" element={<AdminRoute><AdminUpdateProfile /></AdminRoute>} ></Route>

          {/* Auth */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
    //</div>
    /*     </Container> */
  )
}

export default App
