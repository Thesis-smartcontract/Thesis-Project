import { NavLink } from 'react-router-dom';
import React from 'react'

const NavBar = ({admin}) => {

  let userOrAdmin = null;

  if(admin) {
    userOrAdmin = (<li><NavLink to="/admin" activeClassName="activeNav">Admin</NavLink></li>);
  } else {
    userOrAdmin = (<li><NavLink to="/userPoolInfo" activeClassName="activeNav">Your Pool</NavLink></li>);
  }

  return (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">Ethereum Token</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li className="active"><NavLink exact to="/about" exact activeClassName="activeNav">About</NavLink></li>
          <li><NavLink to="/contributing" activeClassName="activeNav">Contributing</NavLink></li>
          <li><NavLink to="/tokenDetail" activeClassName="activeNav">Token Details</NavLink></li>
          <li><NavLink to="/approval" activeClassName="activeNav">Get Approved</NavLink></li>
          <li><NavLink to="/faq" activeClassName="activeNav">FAQ</NavLink></li>
          <li><NavLink to="/smartContract" activeClassName="activeNav">Smart Contract</NavLink></li>
          {userOrAdmin}
        </ul>
      </div>
    </div>
  </nav>
  )
};

export default NavBar;