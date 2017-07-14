import React, { Component } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar.jsx';
import Portal from './Portal.jsx';

class Admin extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render(){
    return(
      <div>
        <Sidebar/>
        <Portal/>
      </div>
    )
  }
}

const MapStateToProps = state => ({
  getAdmins: state.admins.admins
})

export default Admin;