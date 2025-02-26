import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../../contexts/AuthContext'; // Adjust the path as needed
import './CreateAddHomePage.css';

const CreateAddHomePage = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: 'create',
      title: 'Create a new company',
      description: 'Start a brand new company from scratch.',
    },
    {
      id: 'add',
      title: 'Add an existing company',
      description: 'Join an already existing company using your company code.',
    },
    {
      id: 'investor',
      title: 'Continue as investor or employee',
      description: 'Proceed without adding a company.',
    },
  ];

  const handleOptionClick = (id) => {
    setSelectedOption(id);
  };

  const handleNextStep = () => {
    if (selectedOption === 'create') {
      router.push('/company/createaddcompany/createcompanydetails');
    } else if (selectedOption === 'add') {
      router.push('/company/createaddcompany/addcompanycode');
    } else if (selectedOption === 'investor') {
      router.push('/company');
    }
  };

  const handleLogout = async () => {
    await logout(); // Sign out the user so that currentUser becomes null.
    router.push('/');  // Navigate to the home page.
  };

  return (
    <div className="create-add-home-page">
      <header className="create-add-home-page__header">
        <h1>
          Welcome to <span className="create-add-home-page__brand">Orbat</span>
        </h1>
      </header>
      <div className="create-add-home-page__options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`create-add-home-page__option ${
              selectedOption === option.id ? 'selected' : ''
            }`}
            onClick={() => handleOptionClick(option.id)}
          >
            <span
              className={`create-add-home-page__option-circle ${
                selectedOption === option.id ? 'active' : ''
              }`}
            ></span>
            <div className="create-add-home-page__option-text">
              <h2>{option.title}</h2>
              <p>{option.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="create-add-home-page__next-button"
        onClick={handleNextStep}
        disabled={!selectedOption}
      >
        Next step &gt;
      </button>
      <div className="create-add-home-page__logout">
        <button
          className="create-add-home-page__logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default CreateAddHomePage;
