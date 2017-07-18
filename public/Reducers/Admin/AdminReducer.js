import { IS_ADMIN } from '../../Actions/Admin/AdminActions';

const initialState = {
  isAdmin: false
};

export const Admin = (state=initialState, action) => {
  switch(action.type) {
    case IS_ADMIN: {
      console.log(action.payload)
      return Object.assign({}, state, {
        isAdmin: action.payload
      })
    }
    default: {
      return state;
    }
  }
}