import React, { Component } from 'react';

const ReleaseDividend = ({handleReleaseDivClick}) => {
  return (
    <div>
      <button onClick={handleReleaseDivClick}>Release Dividend</button>
    </div>
  )
}

export default ReleaseDividend