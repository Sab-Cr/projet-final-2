import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  color: #fff;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const RedButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const GreenButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    let userId = null;
    cookies.forEach(cookie => {
      const [name, value] = cookie.split("=");
      if (name === "user") {
        userId = value;
      }
    });

    if (userId) {
      fetch(`/api/get-user/${userId.slice(1, -1)}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSaveName = () => {
    // Assuming you have an API route to update the user's name
    fetch(`/api/update-user-name`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        newName: newName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser({ ...user, fullName: newName });
        setNewName("");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating user name:", error);
      });
  };

  const handleLogout = () => {
    document.cookie =
      "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/"; // Navigate to the login page
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    fetch(`/api/delete-user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        // Perform any additional actions after successful deletion
        handleLogout();
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  if (isLoading) {
    return <Container>{t("loading")}</Container>;
  }

  if (!user) {
    return <Container>{t("error400")}</Container>;
  }

  return (
    <Container>
      <Title>{t("profileTitle")}</Title>
      <p>
        {t("fullNameLabel")}: {user.fullName}
      </p>
      <p>
        {t("emailLabel")}: {user.email}
      </p>

      {!isEditing ? (
        <div>
          <Button onClick={() => setIsEditing(true)}>
            {t("changeNameButton")}
          </Button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={newName}
            onChange={handleNameChange}
          />
          <Button onClick={handleSaveName}>{t("saveChangeButton")}</Button>
        </div>
      )}

      <RedButton onClick={handleLogout}>{t("logoutButton")}</RedButton>
      <RedButton onClick={handleDeleteAccount}>{t("deleteAccountButton")}</RedButton>

      {showDeleteConfirmation && (
        <div>
          <p>
            {t("deleteConfirmationMessage")}<br></br>
            {t("deleteConfirmationNote")}
          </p>
          <RedButton onClick={handleConfirmDelete}>{t("yesButton")}</RedButton>
          <GreenButton onClick={handleCancelDelete}>{t("noButton")}</GreenButton>
        </div>
      )}
    </Container>
  );
};

export default Profile;