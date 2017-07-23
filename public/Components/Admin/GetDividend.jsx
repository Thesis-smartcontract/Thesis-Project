import React, { Component } from 'react';

const GetDividend = ({ handleGetDivClick, adminDividend }) => {
  let showDivButton = null
  if(adminDividend !== 0) {
    showDivButton = <button onClick={handleGetDivClick}>Get Dividend</button>
  }
  return (
    <div>
      <p>Current Dividend: {adminDividend} ETH</p>
      {showDivButton}
    </div>
  )
}

export default GetDividend