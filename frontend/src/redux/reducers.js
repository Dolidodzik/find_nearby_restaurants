import { CHANGE_DATA_FOR_API_CALL } from './actions';

const initialState = {
  data_for_api_call: {
    form: {
      open_now: true,
      keyword: "",
      minprice: 1,
      maxprice: 5,
      radius: 5000,
    },
    location_coords: {
      latitude: 0,
      longitude: 0,
    }
  }
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_DATA_FOR_API_CALL:
      return {
        data_for_api_call: action.payload
      };
    default:
      return state;
  }
}
export default reducer
