"use client";

import React from 'react';
import { AuthProvider } from '@/landing/contexts/authcontext'; // Adjust the path as needed

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Include meta tags, title, etc. */}
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
