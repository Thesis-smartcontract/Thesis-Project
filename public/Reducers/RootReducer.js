import { combineReducers } from 'redux';
import { Admin } from './Admin/AdminReducer';
import { UserData } from './Admin/UserDataReducer'
import { VerifiedUserData } from './Admin/VerifiedUserDataReducer'
import { UserPool } from './User/UserPoolReducer'
import { account, web3, Instrument } from '../web3'

const Web3Instance = () => {
  return {
    Web3: web3,
    Account: account,
    Instrument: Instrument
  } 
}

const RootReducer = combineReducers({
  UserPool,
  Admin,
  Web3Instance,
  UserData,
  VerifiedUserData
})

export default RootReducer;