// src/app/page.jsx
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/home'); // Redirects to /home which loads the HomePage from app/home/page.jsx
}
