"use client";

import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create the context with a default value of null.
const AuthContext = React.createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount.
    return unsubscribe;
  }, []);

  // Expose a logout function.
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null); // Immediately clear the local user.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = { currentUser, setCurrentUser, logout };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only after the loading state is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
