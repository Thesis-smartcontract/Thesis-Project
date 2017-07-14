import axios from 'axios';

export const GET_ETH_AMOUNT = 'GET_ETH_AMOUNT';
export const GET_POOL_AGE = 'GET_POOL_AGE';
export const GET_POOL_PART = 'GET_POOL_PART';
export const GET_ETH_PRICE = 'GET_ETH_PRICE'

// put the functions that directly interact with the blockchain inside of here
// as the payload
// to call these function use store.dispatch(getPoolEthAmount)
// you can get the state by using store.getState()

export const getPoolEthAmount = () => {
  return {
    type: GET_ETH_AMOUNT
  };
};

export const getPoolAgeRange = () => {
  return {
    type: GET_POOL_AGE
  };
};

export const getPoolParticipants = () => {
  return {
    type: GET_POOL_PART
  };
};

export const getEthPrice = async () => {
  const request = await axios.get('http://localhost:3000/api/users/ethPrice')
  return {
    type: GET_ETH_PRICE,
    payload: request
  }
}