"use client";
import React from 'react';
import PersonalNavbar from '../../personalcomponents/PersonalNavbar/PersonalNavbar'; // Adjust the path as needed
import PersonalPage from '../../personalpages/HomePage/HomePage';

export default function Page() {
  return (
    <>
      <PersonalNavbar />
      <div>
        <PersonalPage />
      </div>
    </>
  );
}
