// src/app/home/explorehome/layout.jsx
"use client";

import React from 'react';
import Navbar from '../../../components/HomeNavbar/HomeNavbar'; // Adjust path if necessary

export default function ExploreHomeLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
