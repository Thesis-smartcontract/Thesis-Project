import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { account, web3, Instrument } from '../../web3.js';
import VerifyUser from '../../Components/Admin/VerifyUser';
import DeleteUser from '../../Components/Admin/DeleteUser';
import GetDividend from '../../Components/Admin/GetDividend'
import ReleaseDividend from '../../Components/Admin/ReleaseDividend'
import AdminNavBar from '../../Components/Admin/AdminNavBar'
import './admin.css'

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: '',
      displayReleaseButton: false
    }

    this.navBarClick = this.navBarClick.bind(this);
    this.handleVerifySubmit = this.handleVerifySubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleReleaseDivClick = this.handleReleaseDivClick.bind(this);
    this.handleGetDivClick = this.handleGetDivClick.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/api/admin/getDivDate')
      .then(res => {
        res = res.data
        if(res.success === true) {
          this.setState({
            displayReleaseButton: res.success
          })
        } else {
          const nextAvailableYear = (parseInt(res.date.slice(0, 4)) + 1)
          const nextAvailableMonthAndDay = res.date.slice(5, 10)
          const nextAvailableTime = res.date.slice(11, 19)
          this.setState({
            nextDate : `${nextAvailableMonthAndDay}-${nextAvailableYear} at ${nextAvailableTime}`
          })
        }
      })

    this.props.web3.Instrument.deployed().then(instance => {
      return instance.pendingDividends.call(this.props.web3.Account)
    })
    .then(res => {
      this.setState({
        adminDividend: (JSON.parse(res) / Math.pow(10, 18))
      })
    })
  }

  handleVerifySubmit(userAddress, userAge, isLiving) {
    let instrument;
    userAge = parseInt(userAge)
    isLiving = (isLiving === 'true')

    axios.put('http://localhost:3000/api/admin/addTestResult', {
      walletId: userAddress,
      isLiving: isLiving,
      age: userAge,
    })
    .then(res => {
      console.log(res)
      const updatedUser = res.data
      console.log(updatedUser)
      if(!updatedUser.success) {
        alert(updatedUser.message)
      } else if(!updatedUser.updatedUser.isDeleted && !updatedUser.updatedUser.verified) {
        this.props.web3.Instrument.deployed().then(instance => {
          instrument = instance;
          return instrument.verify(userAddress, userAge, { from: this.props.web3.Account });
        })
      } else if(updatedUser.updatedUser.isDeleted) {
        alert('User used to be in a contract, but has been removed from contract for a reason')
      } else if(updatedUser.updatedUser.verified) {
        alert('User has already been verified in the database')
      }
    })
    //TESTING STUFF:
    //delete lines below 83 - 85 using this for testing purposes
    this.props.web3.Instrument.deployed().then(instance => {
      instrument = instance;
      return instrument.verify(userAddress, userAge, { from: this.props.web3.Account });
    })
  }

  handleDeleteSubmit(userAddress) {

    axios.put('http://localhost:3000/api/admin/deleteUser', {
      walletId: userAddress
    })
    .then(user => {
      if(!user) {
        alert('User does not exist')
      } else {
        // TESTING STUFF:
        // take out the if statement if the user is in database to test
        // contract function to delete the user from contract
        // if(!user.data.updatedUser.isDeleted) {
          let instrument;
          this.props.web3.Instrument.deployed().then(instance => {
            instrument = instance;
            instrument.removeFromPool([userAddress], { from: this.props.web3.Account });
          })
          .catch(err => {
            console.log(err)
          })
        // }
      }
    })
  }
  
  handleReleaseDivClick() {
    this.setState({
      displayReleaseButton: false
    })
    axios.post('http://localhost:3000/api/admin/releaseDiv')
      .then(res => {
        res = res.data
        if(res.success) {
          let instrument;
          this.props.web3.Instrument.deployed().then(instance => {
            instrument =  instance;
            return instrument.releaseDividends({ from: this.props.web3.Account })
          })
          .then(() => {
            var promises = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(x => {
              return instrument.pool.call(x);
            })
            return Promise.all(promises);
          })
          .then((pools) => {
            console.log(pools);
          })

          alert('Funds have been released')
          const nextAvailableYear = (parseInt(res.timer.slice(0, 4)) + 1)
          const nextAvailableMonthAndDay = res.timer.slice(5, 10)
          const nextAvailableTime = res.timer.slice(11, 19)
          this.setState({
            nextDate : `${nextAvailableMonthAndDay}-${nextAvailableYear} at ${nextAvailableTime}`
          })
        } else {
          alert(res.message)
        }
      })
  }

  handleGetDivClick() {
    this.props.web3.Instrument.deployed().then(instance => {
      return instance.collectDividend({from: this.props.web3.Account })
    })
    .then((res) => {
      if(res) {
        this.setState({
          adminDividend: 0
        })
      }
    })
  }

  navBarClick(clicked) {
    this.setState({
      clicked: clicked
    })
  }

  render(){
    let currentAdminView = <p>Welcome Admin!</p>;

    if(this.state.clicked === 'verifyUser') {
      currentAdminView = <VerifyUser 
                          handleVerifySubmit={this.handleVerifySubmit}
                        />;
    } else if(this.state.clicked === 'deleteUser') {
      currentAdminView = <DeleteUser
                          handleDeleteSubmit={this.handleDeleteSubmit}
                        />
    } else if(this.state.clicked === 'getDiv') {
      currentAdminView = <GetDividend
                          handleGetDivClick={this.handleGetDivClick}
                          adminDividend={this.state.adminDividend}
                        />
    } else if(this.state.clicked === 'releaseDiv') {
      currentAdminView = <ReleaseDividend
                          handleReleaseDivClick={this.handleReleaseDivClick}
                          nextDate={this.state.nextDate}
                          displayReleaseButton={this.state.displayReleaseButton}
                        />
    }

    return(
      <div id="admin">
        <AdminNavBar className="navbar" navBarClick={this.navBarClick}/>
        <div className="view">
        {currentAdminView}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  admin: state.Admin,
  web3: state.Web3Instance
})

export default connect(mapStateToProps)(Admin);