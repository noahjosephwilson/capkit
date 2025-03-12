// app/layout.jsx
// app/layout.jsx
import React from 'react';
import { AuthProvider } from '../contexts/AuthContext'; // Adjust path if needed
import './globals.css'; // Global styles

export const metadata = {
  title: 'Capkit',
  description: 'All in one CFO solution',
  icons: [
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
