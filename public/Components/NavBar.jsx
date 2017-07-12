import { NavLink } from 'react-router-dom';
import React from 'react'
const NavBar = () => (
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
          <li className="nav-item">
            <a href="https://twitter.com/" target="_blank" className="nav-link">
                <i className="fa fa-twitter" aria-hidden="true"></i> Link to our twitter(twitter icon)
            </a>
          </li>
          <li className="nav-item">
            <a href="https://github.com/" target="_blank" className="nav-link"> Link to our github(github icon)
                <i className="fa fa-github" aria-hidden="true"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;