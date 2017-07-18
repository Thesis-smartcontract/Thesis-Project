import React, { Component } from 'react';

const PoolInfo = ({ userPoolInfoObj }) => {
  return (
  <div>
    <ul>
      <li>{userPoolInfoObj.poolMidAge}</li>
      <li>{userPoolInfoObj.numPoolPart}</li>
      <li>{userPoolInfoObj.ethAmount}</li>
      <li>{userPoolInfoObj.ethPrice}</li>
    </ul>
  </div>
  )
}

export default PoolInfo