import axios from 'axios';



export const FETCH_ADMINS = 'GET_ADMINS';

export const getAdmins = () => {
  return {
    type: FETCH_ADMINS,
    payload: axios.get("http://localhost:3000/api/getAdmins")
  };
};