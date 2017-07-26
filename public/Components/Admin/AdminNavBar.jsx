import React, { Component } from 'react';
import { connect } from 'react-redux';
import './adminNavbar.css'

const AdminNavBar = ({navBarClick, style}) => {

  // add this in once we add dividend to db and make axios call
  // if('dividend hasnt been released after a yr') {
  //   releaseDividend = <button onClick={() => navBarClick('releaseDiv')}>Release Dividend</button>
  // }
  return (
    <div className="navbar">
      <button onClick={() => navBarClick('Verify a User')}>Verify User</button>
<<<<<<< HEAD
      <button onClick={() => navBarClick('Add Test Result')}>Add Test Result</button>
=======
>>>>>>> a292b58cdb368fe36530d5471ae0caf6bc235168
      <button onClick={() => navBarClick('Delete a User')}>Delete User</button>
      <button onClick={() => navBarClick('Release Yearly Dividend')}>Release Dividend</button>
      <button onClick={() => navBarClick('Get Admin Dividend')}>Get Dividend</button>
      <button onClick={() => console.log('Pause the Contract')}>Pause Contract</button>
      <button onClick={() => console.log('Delete the Contract')}>Delete Contract</button>
    </div>
  )
}
// come back to this later
export default AdminNavBar;