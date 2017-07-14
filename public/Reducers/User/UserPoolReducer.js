<<<<<<< c7097bc165039605d5dd73943a87584a3335d5ff
const UserPool = (state => {

}, action) => {
  switch (action.type) {
    
  }
}

// const auth = (state = {
//   isAuthenticated: checkTokenExpiry(),
//   profile: getProfile(),
//   err: '',
// }, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS :
//       return Object.assign({}, state, { isAuthenticated: true, profile: action.profile });
//     case LOGIN_ERROR :
//       return Object.assign({}, state, { isAuthenticated: false, profile: null, error: action.error });
//     case LOGOUT_SUCCESS :
//       return Object.assign({}, state, { isAuthenticated: false, profile: null });
//     default:
//       return state;
//   }
// };
=======
import { 
         GET_ETH_AMOUNT,
         GET_POOL_AGE,
         GET_POOL_PART,
         GET_ETH_PRICE
        } from '../../Actions/User/UserActions'

export const UserPool = (state={
  ethAmount: 0,
  poolAge: null,
  poolPart: 0,
  ethPrice: 0
}, action) => {
  switch (action.type) {
    case GET_ETH_AMOUNT: 
      return Object.assign({}, state, { ethAmount: action.payload })
    case GET_POOL_AGE:
      return Object.assign({}, state, { poolAge: action.payload })
    case GET_POOL_PART:
      return Object.assign({}, state, { poolPart: action.payload })
    case GET_ETH_PRICE:
      return Object.assign({}, state, { ethPrice: action.payload.data.data.amount })
    default:
      return state;
  }
}
>>>>>>> working with redux
