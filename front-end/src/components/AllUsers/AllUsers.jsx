import React from 'react';
import './AllUsers.scss'
// all users data is imported from the DB and to be displayed for the admin as view only 
const userData = [
  { firstName: 'John', lastName: 'Doe', email: 'johndoe@example.com', username: 'johndoe' },
  { firstName: 'Jane', lastName: 'Doe', email: 'janedoe@example.com', username: 'janedoe' },
  { firstName: 'Bob', lastName: 'Smith', email: 'bobsmith@example.com', username: 'bobsmith' },
];

const AllUsers = () => {
    return (
        <table className="user-tablexx">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
};

export default AllUsers;
