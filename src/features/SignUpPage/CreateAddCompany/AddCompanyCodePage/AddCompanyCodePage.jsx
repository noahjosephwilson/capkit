import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateCompanyDetailsRightSidePage from './AddCompanyCodeRightSidePage/AddCompanyCodeRightSidePage';
import './AddCompanyCodePage.css';

const AddCompanyCodePage = () => {
  const router = useRouter(); // Using Next.js router
  const [joinCompanyCode, setJoinCompanyCode] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the join company code is not empty.
    const newErrors = {};
    if (!joinCompanyCode.trim()) {
      newErrors.joinCompanyCode = 'This field is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    
    // Process the join company code.
    console.log({ joinCompanyCode });
    
    // Navigate to the dashboard (or another route) on success.
    router.push('/company');
  };

  return (
    <div className="ccd-page">
      {/* Header strip with back arrow and Orbat name (only on the left side) */}
      <div className="ccd-header">
        <div className="ccd-back" onClick={() => router.push('/company/createaddcompany/createaddhome')}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ccd-back-text">Orbat</span>
        </div>
      </div>

      {/* Main content */}
      <div className="ccd-content">
        <h1>Add Company Code</h1>
        <p className="ccd-disclaimer">All fields marked with * are required.</p>
        <form onSubmit={handleSubmit} className="ccd-form">
          <label>Join Company Code *</label>
          {errors.joinCompanyCode && (
            <div className="field-error">{errors.joinCompanyCode}</div>
          )}
          <input
            type="text"
            value={joinCompanyCode}
            onChange={(e) => setJoinCompanyCode(e.target.value)}
            required
          />
          <button type="submit" className="ccd-submit-button">
            Submit
          </button>
        </form>
      </div>

      <CreateCompanyDetailsRightSidePage />
    </div>
  );
};

export default AddCompanyCodePage;
