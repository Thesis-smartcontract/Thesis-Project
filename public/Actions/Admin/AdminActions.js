import axios from 'axios';
import { account, web3, Instrument } from '../../web3.js'

export const IS_ADMIN = 'IS_ADMIN';

export const isAdmin = (userAddress) => {
  const request = axios.get(`http://localhost:3000/api/admin/${userAddress}`)
  return {
    type: IS_ADMIN,
    payload: request
  };
};