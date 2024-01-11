import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase.js'

async function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  const userRef = await getDoc(doc(db, "users", currentUser.uid));
  //console.log(userRef.data().roles.toString())

  return currentUser && userRef.data().roles.includes("admin") ? children : <Navigate to="/login" />;
}

export default AdminRoute;