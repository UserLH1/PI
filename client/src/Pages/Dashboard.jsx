import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';

function Dashboard() {
  return (
    <div>
      <Header />
    <div className="dashboard-container">
      {/* Table for passwords */}
      <table className="password-table">
        <thead>
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
        </tbody>
      </table>

      {/* Buttons for password actions */}
      <div className="password-actions">
        <Link className="btn btn-default bg-light border w-100 my-2" to="../addItem">Add Password</Link>
        {/* You can duplicate the above line and change the className and to properties to create Edit and Delete buttons */}
      </div>
    </div>
    </div>
  )
}

export default Dashboard;
