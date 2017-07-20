import React, { Component } from 'react';

const PoolInfo = ({ userPoolInfoObj }) => {
  return (
  <div>
    <ul>
      <li>Pool Mid-Age: {userPoolInfoObj.poolMidAge}</li>
      <li>Number of Participants: {userPoolInfoObj.numPoolPart}</li>
      <li>Total Eth In Pool: {(userPoolInfoObj.ethAmount / Math.pow(10, 18))}</li>
      <li>Current Eth Price: {userPoolInfoObj.ethPrice}</li>
    </ul>
  </div>
  )
}

export default PoolInfo