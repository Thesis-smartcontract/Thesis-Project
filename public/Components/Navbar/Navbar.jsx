import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Logo from './Logo.jsx';
import NavItemList from './NavItemList.jsx';
import './navbar.css';

class Navbar extends Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    let path = this.props.location.pathname;

    // if (path !== '/') {
    //   var divStyle = {
        
    //   };
    // }

    return (
      <div className="nav-bar">
        <Logo/>
        <NavItemList isAdmin={this.props.admin}/>
      </div>
    );
  } 
  
}

module.exports = withRouter(props => <Navbar {...props} />);