// src/app/home/page.jsx
import { redirect } from 'next/navigation';

export default function CompanyRedirect() {
  // This server component immediately redirects to /home/explorehome.
  redirect('/company/companyhome');
  // Return null because the component won't render anything.
  return null;
}
