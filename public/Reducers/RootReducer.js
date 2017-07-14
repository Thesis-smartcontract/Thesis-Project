import { combineReducers } from 'redux';
<<<<<<< c7097bc165039605d5dd73943a87584a3335d5ff
import pool from './User/UserPoolReducer';


const RootReducer = combineReducers({
  pool
=======
import admins from './Admin/AdminReducer';
import { UserPool } from './User/UserPoolReducer'

const RootReducer = combineReducers({
  UserPool
>>>>>>> working with redux
})

export default RootReducer;