import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase.js"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail as updateEmailFirebase,
  updatePassword as updatePasswordFirebase,
  updateProfile as updateProfileFirebase,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signup(email, password) {
    //setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
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

  function updateProfile(username) {
    return updateProfileFirebase(currentUser, { displayName: username });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      //console.log(currentUser);
      setCurrentUser(currentUser);
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
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
