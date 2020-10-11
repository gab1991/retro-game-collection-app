import { SIGN_IN } from '../Actions/authActions';

const loginReducer = (state = false, { type, payload }) => {
  switch (type) {
    case SIGN_IN:
      return payload;
    default:
      return state;
  }
};

export default loginReducer;
