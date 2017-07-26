import { TEST_INPUT_CHANGE } from '../../Actions/Admin/VerifiedUserDataActions';

export const VerifiedUserData = (state='', action) => {
  switch(action.type) {
    case TEST_INPUT_CHANGE: {
      return action.payload
    }
    default: {
      return state
    }
  }
}