// app/layout.jsx
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext'; // Adjust path if needed
import './globals.css'; // Global styles

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
