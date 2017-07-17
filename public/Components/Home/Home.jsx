import React, { Component } from 'react';


class Home extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        <Headline/>
        <Features/>
        <Strategy/>
        <Mission/>
        <div>
          <Button name="More Info"/>
          <Button name="Sign Up"/>
        </div>
      </div>
    )
  }
}