import React, { useState, useEffect } from "react";
import "./GeneralAccountPage.css";
import profileIcon from "../../../assets/profile-icon.png"; // Default placeholder image
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuth } from "../../../contexts/AuthContext";

const GeneralAccountPage = () => {
  const { currentUser } = useAuth();
  const db = getFirestore();
  const storage = getStorage();

  // State for form fields
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null); // Actual file to upload
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  // On mount, fetch Firestore user data
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setEmail(data.email || "");
          setPhoneNumber(data.phoneNumber || "");
          setBio(data.bio || "");
          if (data.profileImage) {
            setProfileImage(data.profileImage);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [currentUser, db]);

  // Handle profile image upload with eligible image format check
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        // Set preview URL and also store the file object for upload
        setProfileImage(URL.createObjectURL(file));
        setProfileImageFile(file);
      } else {
        alert("Please upload an eligible image format (e.g., JPEG, PNG).");
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newProfileImageURL = profileImage; // use the current image URL

      // If a new file was uploaded, upload it to Storage and get its download URL
      if (profileImageFile) {
        const storageRef = ref(storage, `profileImages/${currentUser.uid}/profile.jpg`);
        const snapshot = await uploadBytes(storageRef, profileImageFile);
        newProfileImageURL = await getDownloadURL(snapshot.ref);
      }

      // Update (or merge into) the user document in Firestore
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          bio,
          profileImage: newProfileImageURL,
        },
        { merge: true }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("There was an error updating your profile. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="general-account">
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="account-content">
          {/* Left Column: Profile Section */}
          <div className="profile-section">
            <div className="section-label">Profile Image</div>
            <div className="profile-image-wrapper">
              <label htmlFor="profileImage" className="profile-image-label">
                <img
                  src={profileImage || profileIcon}
                  alt={profileImage ? "Profile" : "Placeholder"}
                  className="profile-image"
                />
              </label>
              {/* When clicking the Add File button, trigger the hidden file input */}
              <button
                type="button"
                className="add-file-button"
                onClick={() =>
                  document.getElementById("profileImage").click()
                }
              >
                Add File
              </button>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Right Column: Fields Section */}
          <div className="fields-section">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio / About Me</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="4"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Save Button: Full-Width at Bottom */}
        <div className="save-button-container">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralAccountPage;
