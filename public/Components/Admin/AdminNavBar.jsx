import React, { Component } from 'react';
import { connect } from 'react-redux';

const AdminNavBar = ({navBarClick}) => {
  let releaseDividend = null
  // add this in once we add dividend to db and make axios call
  // if('dividend hasnt been released after a yr') {
  //   releaseDividend = <button onClick={() => navBarClick('releaseDiv')}>Release Dividend</button>
  // }
  return (
    <div>
      <button onClick={() => navBarClick('verifyUser')}>Verify User</button>
      <button onClick={() => navBarClick('deleteUser')}>Delete User</button>
      {releaseDividend}
      <button onClick={() => navBarClick('releaseDiv')}>Release Dividend</button>
      <button onClick={() => navBarClick('getDiv')}>Get Dividend</button>
    </div>
  )
}
// come back to this later
export default AdminNavBar;