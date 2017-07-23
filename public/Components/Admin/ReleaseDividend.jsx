import React, { Component } from 'react';

const ReleaseDividend = ({handleReleaseDivClick, nextDate, displayReleaseButton}) => {
  let display = null
  if(displayReleaseButton) {
    display =  <button onClick={handleReleaseDivClick}>Release Dividend</button>
  } else {
    display = <p>You will be able to release dividend on: {nextDate}</p>
  }
  return (
    <div>
      {display}
    </div>
  )
}

export default ReleaseDividend