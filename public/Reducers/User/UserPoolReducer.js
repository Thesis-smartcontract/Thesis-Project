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
      console.log('you are in reducer')
      console.log(state.ethAmount)
      return Object.assign({}, state, { ethAmount: state.ethAmount + action.payload })
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
