"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig"; // Adjust the path if needed
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create the context with a default value of null.
const authcontext = createContext(null);

export function useAuth() {
  const context = useContext(authcontext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
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

  async function logout() {
    try {
      await signOut(auth);
      setCurrentUser(null); // Immediately clear the local user.
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  const value = { currentUser, setCurrentUser, logout };

  return (
    <authcontext.Provider value={value}>
      {/* Render children only after the loading state is complete */}
      {!loading && children}
    </authcontext.Provider>
  );
}
