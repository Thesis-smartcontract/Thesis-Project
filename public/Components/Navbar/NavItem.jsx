import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clickDocumentation } from '../../Actions/SmartContract/SmartContractActions.js';

const fetchSmartContractData = () => {

}

const NavItem = (props) => (
  <li className="nav-item">
    <NavLink to={props.link} title={props.title} activeClassName="active" onClick={props.link === '/smartContract' ? clickDocumentation : null}>
      {props.title}
    </NavLink>
  </li>
);

// const mapStateToProps = (state) => {
//   return {
//     link: state.link
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({clickDocumentation: clickDocumentation}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(NavItem);

module.exports = NavItem;
