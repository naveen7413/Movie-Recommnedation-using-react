import React from "react";
import { Link } from "react-router-dom";
import "../styles/admin.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Movie App</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
