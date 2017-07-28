import React, { Component } from 'react';
import './ReleaseDividend.css'

const ReleaseDividend = ({handleReleaseDivClick, nextDate, displayReleaseButton}) => {
  let display = null
  if(displayReleaseButton) {
    display =  <button onClick={handleReleaseDivClick}>Release</button>
  } else {
    display = <p>You will be able to release dividend again on: {nextDate}</p>
  }
  return (
    <div className="releaseDiv">
      {display}
    </div>
  )
}

export default ReleaseDividend