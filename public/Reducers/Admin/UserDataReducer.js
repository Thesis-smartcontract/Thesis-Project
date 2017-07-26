import { INPUT_CHANGE } from '../../Actions/Admin/UserDataActions';

export const UserData = (state='', action) => {
  switch(action.type) {
    case INPUT_CHANGE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}