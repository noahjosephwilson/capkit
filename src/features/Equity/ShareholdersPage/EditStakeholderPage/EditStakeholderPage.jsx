"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HeaderTitle from "../../../../components/HeaderTitle/HeaderTitle";
import styles from "./EditStakeholderPage.module.css";

const EditStakeholderPage = () => {
  const router = useRouter();
  const backPath = "/company/companyhome/shareholders";

  // Form state for editing stakeholder details.
  // You can pre-populate these values when editing an existing stakeholder.
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    email: "",
    role: "",
    otherRole: "",
  });

  // Role options with an "Other" option.
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "CEO", label: "CEO" },
    { value: "CFO", label: "CFO" },
    { value: "CTO", label: "CTO" },
    { value: "Investor", label: "Investor" },
    { value: "Employee", label: "Employee" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your update logic here
  };

  return (
    <div className={styles.editStakeholderPage}>
      <header className={styles.header}>
        <HeaderTitle
          backLinkText="Shareholders"
          titleSuffix="Edit Stakeholder"
          backPath={backPath}
          showBack={true}
        />
      </header>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label htmlFor="name">Stakeholder Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="e.g., John Doe"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="nickname">Nickname (Optional)</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="e.g., Johnny"
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="email">Stakeholder Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={styles.inputField}
              placeholder="e.g., john.doe@example.com"
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={styles.selectInput}
              required
            >
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {formData.role === "other" && (
            <div className={styles.fieldGroup}>
              <label htmlFor="otherRole">Other</label>
              <input
                type="text"
                id="otherRole"
                name="otherRole"
                value={formData.otherRole}
                onChange={handleInputChange}
                className={styles.inputField}
                placeholder="Please specify the role"
                required
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            Edit Stakeholder
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStakeholderPage;
