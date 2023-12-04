import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
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
          {/* Example row, you will map over your data here */}
          <tr>
            <td>example.com</td>
            <td>user@example.com</td>
            <td>••••••••</td>
            <td>
              <button className="btn btn-edit">Edit</button>
              <button className="btn btn-delete">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Buttons for password actions */}
      <div className="password-actions">
        <Link className="btn btn-default bg-light border w-100 my-2" to="../addItem">Add Password</Link>
        {/* You can duplicate the above line and change the className and to properties to create Edit and Delete buttons */}
      </div>
    </div>
  )
}

export default Dashboard;
