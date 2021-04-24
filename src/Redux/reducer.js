const GET_DATA_CURRENCY = "GET_DATA_CURRENCY";
const IS_VISIBLE = "IS_VISIBLE";

export default function reducer(state = {isVisible: false}, action)  {

  switch(action.type) {
    case GET_DATA_CURRENCY:
      return { ...state, data: action.payload.data };

    case IS_VISIBLE:
      return {...state, isVisible: action.payload.isVisible}

    default:
      return state;
  }
    

}