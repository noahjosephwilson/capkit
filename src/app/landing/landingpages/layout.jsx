// src/app/home/explorehome/layout.jsx
"use client";

import React from 'react';
import HomeNavbar from '@/landing/components/navbar/Navbar'; // Adjust path if necessary

export default function ExploreHomeLayout({ children }) {
  return (
    <>
      <HomeNavbar />
      <main>{children}</main>
    </>
  );
}
