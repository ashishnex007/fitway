import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import UserList from "../Community/UserList";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const Admin = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const adminAuthToken = localStorage.getItem("Token");
  console.log(adminAuthToken)

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/logoutAdmin");
      navigate("/");
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const handleGetUserData = async (e) => {
    e.preventDefault();
    try {
      console.log("Admin Token:", adminAuthToken);

      const response = await axios.get("http://localhost:3000/api/getAllUsers", {
        headers: {
          Authorization: `Bearer ${adminAuthToken}`,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = response.data;
        setUserData(data);
        console.log(data);
      } else {
        console.error("Error fetching user data:", response.status, response.statusText);
        console.error("Error details:", response.data);
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div className="fitness-admin">
      <div className='fitness-navbar'>
        <nav className="fit-navbar" style={{display:"flex",justifyContent:"space-between"}}>
          <div className="navbar-left" >
            <h3 style={{marginLeft:"14rem"}}>FitWay</h3>
          </div>
          <div className="navbar-right">
            <div className='navbar-button'>
              <button className="nav-auth-button" onClick={handleLogout} style={{marginRight:"14rem"}}>Logout</button>
          </div>
          </div>
        </nav>
    </div>
      {/*<div className="admin-panel">
        <h1 className="head">Welcome to Admin's Panel</h1>
        <button onClick={handleGetUserData}>
          Get Data
        </button>
        {userData && (
          <div>
            <h2>User Data:</h2>
            <ul>
              {userData.map((user) => (
                <li key={user._id}>
                   User details rendering 
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>*/}
      <br />
      <div className="container">
        <h3>Admin's panel</h3>
        <UserList/>
      </div>
    </div>
  );
};

export default Admin;