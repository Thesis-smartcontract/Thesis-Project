// import { GET_ADMINS } from '../../Actions/Admin/AdminActions';

// const initialState = {
//   fetching: false,
//   fetched: false,
//   admins:[],
//   error: null
// };

// const Admin = (state=initialState, action) => {
//   switch(action.type) {
//     case 'FETCH_ADMINS_PENDING': {
//       return {
//               ...state,
//               fetching: true
//             };
//       break;
//     }
//     case "FETCH_ADMINS_REJECTED": {
//       return {...state,
//               fetching: false,
//               err: action.payload
//             };
//       break;
//     }
//     case "FETCH_ADMINS_FULFILLED": {
//       return {
//               ...state,
//               fetching: false,
//               fetched: true,
//               admins: action.payload
//       };
//       break;
//     }
//     default: {
//       return state;
//     }
//   }
//   return state;
// };