import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./User.scss";
import UserComponent from "./UserComponent";
import Navbar from "../Navbar/Navbar";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    age: "",
    BMI: "",
  });
  const isNewUser = location.state && location.state.isNewUser;


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/logout", { method: "POST" });
      navigate("/");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  


  const getUserData = async (e) => {
    e.preventDefault();
    const userIsNewlyRegistered = true;

    setIsNewUser(userIsNewlyRegistered);
  };

  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100; 
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    return isNaN(bmi) ? "" : bmi; 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const authToken = location.state.token;
    console.log(authToken)
    if (!authToken) {
      console.error("User not authenticated");
      return;
    }
    

    try {
      const response = await fetch("http://localhost:3000/api/fitness", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Succcessfully submitted")
      } else {
        alert("errror")
      }
    } catch (error) {
      console.error("API Error: " + error);
    }
  };


  return (
    <div>
    {!isNewUser && (
      <>
      <Navbar logout="yes"/>
        <div>
          <UserComponent />
        </div>
      </>
    )}

{/*
    <div>
      <button onClick={getUserData}>get user details</button>
    </div>
  */}

    {/* Conditionally render the form based on whether the user is newly registered */}
    {isNewUser && (
      <div className="form">
      <h1>Tell us more about yourself</h1>
      <form onSubmit={handleFormSubmit} >
      <div className="form-grid">
        <label className="input-label">
          Height:
          <input
            type="number"
            min="0"
            value={formData.height}
            onChange={(e) =>
              setFormData({ ...formData, height: e.target.value })
            }
          />
        </label>
        <label>
          Weight:
          <input
            type="number"
            min="0"
            value={formData.weight}
            onChange={(e) =>
              setFormData({ ...formData, weight: e.target.value })
            }
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            min="0"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </label>
        <label>
          BMI:
          <input
            type="text"
            value={calculateBMI(formData.height, formData.weight)}
          disabled
          />
        </label>
        <button type="submit">Submit</button>
        </div>
      </form>
      </div>
    )}
    </div>
  )
}

export default User;
