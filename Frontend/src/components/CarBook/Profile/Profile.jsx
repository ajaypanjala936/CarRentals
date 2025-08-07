// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Profile.css"

// const Profile = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));

//   const handleLogout = () => {
//     localStorage.removeItem('loggedInUser');
//     navigate('/login');
//   };

//   if (!user) {
//     return (
//       <div className="profile-container">
//         <h2>Please login to view your profile</h2>
//         <button onClick={() => navigate('/login')}>Login</button>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-container">
//       <h2>User Profile</h2>
//       <div className="profile-details">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Mobile:</strong> {user.mobile}</p>
//       </div>
//       <button className="logout-btn" onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!loggedInUser?.token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${loggedInUser.token}`
          }
        });
        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("loggedInUser");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  if (loading) return <div className="profile-container">Loading...</div>;
  if (!user) return (
    <div className="profile-container">
      <h2>Please login</h2>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mobile:</strong> {user.mobile}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;