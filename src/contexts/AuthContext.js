import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase.js"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail as updateEmailFirebase,
  updatePassword as updatePasswordFirebase,
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
  }

  async function login(email, password) { /* dùng setLoading(true) vẫn dc nhưng await đẹp hơn :v */
    await signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    localStorage.removeItem('genius-token');
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return updateEmailFirebase(auth, currentUser, email);
  }

  function updatePassword(password) {
    return updatePasswordFirebase(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
