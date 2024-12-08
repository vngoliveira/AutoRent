import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    cpf: "",
    cep: "",
  });

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${user.userId}`
        );
        const data = await response.json();
        setUserData({
          ...data,
          dateOfBirth: formatDate(data.dateOfBirth),
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${user.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  console.log(userData.dateOfBirth);

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Birth Date:
          <input
            type="date"
            name="birthDate"
            value={userData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          CPF:
          <input
            type="text"
            name="cpf"
            value={userData.cpf}
            onChange={handleChange}
          />
        </label>
        <label>
          CEP:
          <input
            type="text"
            name="cep"
            value={userData.cep}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
