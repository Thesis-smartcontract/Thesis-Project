import { 
         GET_POOL_INFO,
         GET_ETH_PRICE,
         IS_VERIFIED
        } from '../../Actions/User/UserActions';

export const UserPool = (state={
  isVerified: null,
  ethAmount: 0,
  poolMidAge: null,
  numPoolPart: 0,
  ethPrice: 0,
  isInPool: false
}, action) => {
  switch (action.type) {
    case GET_POOL_INFO:
      if(action.payload) {
        return Object.assign({}, state, { 
          ethAmount: action.payload.poolEthTotal,
          poolMidAge: action.payload.midAge,
          numPoolPart: action.payload.numPart,
          isInPool: true
        });
      }
    case GET_ETH_PRICE:
      return Object.assign({}, state, { ethPrice: action.payload.data.data.amount });
    case IS_VERIFIED:
      if(action.payload.user) {
        return Object.assign({}, state, { isVerified: action.payload.user.verified });
      }
      //using this below for testing purposes
      return Object.assign({}, state, { isVerified: true });
    default:
      return state;
  }
}
