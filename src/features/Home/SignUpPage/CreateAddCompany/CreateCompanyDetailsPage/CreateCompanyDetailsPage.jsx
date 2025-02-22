import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CreateCompanyDetailsRightSidePage from './CreateCompanyDetailsRightSidePage/CreateCompanyDetailsRightSidePage';
import './CreateCompanyDetailsPage.css';

// Firestore functions
import { collection, addDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore';
// Firebase configuration (Firestore, Storage, and Auth)
import { db, storage, auth } from '../../../../../firebase/firebaseConfig';
// Firebase Storage functions
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const CreateCompanyDetailsPage = () => {
  const router = useRouter(); // Using Next.js router

  // Field states
  const [companyName, setCompanyName] = useState('');
  const [yourRole, setYourRole] = useState('');
  const [companyImage, setCompanyImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [companyDescription, setCompanyDescription] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');

  // State for error messages and submission flag
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debug logs
  console.log("Firestore instance:", db);
  console.log("Storage instance:", storage);

  // Handle image selection and preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setCompanyImage(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      console.log("Selected image:", file.name);
    }
  };

  // Cleanup object URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setError('');
    setIsSubmitting(true);

    // Basic validation for required fields
    if (!companyName.trim() || !yourRole || !companyType || !phoneNumber.trim()) {
      setError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    let imageUrl = null;
    if (companyImage) {
      try {
        // Create a unique name and reference for the image in Firebase Storage
        const imageName = `${Date.now()}_${companyImage.name}`;
        const imageRef = ref(storage, `companies/${imageName}`);
        console.log("Uploading image to path:", imageRef.fullPath);

        // Upload the image
        const uploadResult = await uploadBytes(imageRef, companyImage);
        console.log("Upload result:", uploadResult);

        // Retrieve the download URL
        imageUrl = await getDownloadURL(imageRef);
        console.log("Retrieved image URL:", imageUrl);
      } catch (err) {
        console.error("Error during image upload:", err);
        setError("Error uploading company image: " + err.message);
        setIsSubmitting(false);
        return;
      }
    } else {
      console.log("No company image selected; continuing without image.");
    }

    // Build the company data object
    const companyData = {
      companyName,
      yourRole,
      imageUrl, // May be null if no image was uploaded
      companyType,
      phoneNumber,
      companyEmail,
      companyDescription,
      createdAt: serverTimestamp()
    };

    console.log("Saving company data:", companyData);

    try {
      // Create the company document in the "companies" collection
      const companyDocRef = await addDoc(collection(db, "companies"), companyData);
      console.log("Company document written with ID:", companyDocRef.id);

      // Get the currently logged-in user
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Add a document in the "officers" subcollection under the company document
        await setDoc(
          doc(db, "companies", companyDocRef.id, "officers", currentUser.uid),
          {
            userId: currentUser.uid,
            addedAt: serverTimestamp()
          }
        );
        console.log("Officer document created for user:", currentUser.uid);

        // Also add the company ID to the "mycompanies" subcollection under the user's document
        await setDoc(
          doc(db, "users", currentUser.uid, "mycompanies", companyDocRef.id),
          {
            companyId: companyDocRef.id,
            addedAt: serverTimestamp()
          }
        );
        console.log("Company ID added to mycompanies for user:", currentUser.uid);
      } else {
        console.warn("No authenticated user found. Officer and mycompanies subcollections not created.");
      }
      router.push('/company');
    } catch (err) {
      console.error("Error creating company document:", err);
      setError("Error creating company document: " + err.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="ccd-page">
      {/* Header with back arrow */}
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
        <h1>Create New Company Details</h1>
        <p className="ccd-disclaimer">All fields marked with * are required.</p>

        {/* Error message container positioned on the left */}
        {error && (
          <div
            style={{
              backgroundColor: "#ffd2d2",
              color: "#d8000c",
              border: "1px solid #d8000c",
              padding: "10px",
              marginBottom: "20px",
              borderRadius: "5px",
              textAlign: "left",
              maxWidth: "300px",
              marginLeft: "0"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="ccd-form">
          {/* Company Name */}
          <label>Company Name *</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          {/* Your Role */}
          <label>Your Role *</label>
          <select
            value={yourRole}
            onChange={(e) => setYourRole(e.target.value)}
            required
          >
            <option value="" disabled hidden></option>
            <option value="Founder">Founder</option>
            <option value="Co-founder">Co-founder</option>
            <option value="CEO">CEO</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Investor">Investor</option>
          </select>

          {/* Company Type */}
          <label>Company Type *</label>
          <select
            value={companyType}
            onChange={(e) => setCompanyType(e.target.value)}
            required
          >
            <option value="" disabled hidden></option>
            <option value="LLC">LLC</option>
            <option value="Corporation">Corporation</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Partnership">Partnership</option>
          </select>

          {/* Phone Number */}
          <label>Phone Number *</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          {/* Company Profile Image */}
          <label>Company Profile Image</label>
          <div className="ccd-image-upload-container">
            <div className="ccd-image-preview-container">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile Preview"
                  className="ccd-image-preview"
                />
              ) : (
                <div className="ccd-image-placeholder">Preview</div>
              )}
            </div>
            <label htmlFor="companyImage" className="ccd-file-button">
              Choose File
            </label>
            <input
              type="file"
              id="companyImage"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Company Email (Optional) */}
          <label>Company Email</label>
          <input
            type="email"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
          />

          {/* Company Description (Optional) */}
          <label>Company Description</label>
          <textarea
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            rows="4"
          ></textarea>

          <button type="submit" className="ccd-submit-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <CreateCompanyDetailsRightSidePage />
    </div>
  );
};

export default CreateCompanyDetailsPage;
