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
      return state;
    case GET_ETH_PRICE:
      return Object.assign({}, state, { ethPrice: action.payload.data.data.amount });
    case IS_VERIFIED:
      if(action.payload.data.success) {
        return Object.assign({}, state, { isVerified: action.payload.data.user.verified });
      }
      return state;
    default:
      return state;
  }
}
