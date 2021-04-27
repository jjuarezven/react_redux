import * as types from "../actions/actionTypes";

export default function courseReducer(state = [], action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      // FLOW:
      // 4 create a new state with the action.course sent by creator
      //debugger;
      return [...state, { ...action.course }];
    default:
      return state;
  }
}
