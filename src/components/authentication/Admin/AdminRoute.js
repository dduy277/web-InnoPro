import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../../firebase'

function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  async function Admin() {
    const UID = await getDoc(doc(db, "users", currentUser.uid))
    const Admin = UID.data().roles.includes("admin")
    return Admin
  }
  const isAdmin = Admin()
  //console.log(isAdmin)
  return currentUser && isAdmin ? children : <Navigate to="/login" />;
}

export default AdminRoute;