// this is the action creator function
import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusAction";

export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors: authors
  };
}

export function loadAuthors() {
  // thunk injects dispatch so we don't have to
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

/*
Redux flow to add the authors name functionality:
1 Create Action
2 Create Reducer
3 Update index.js to add the new reducer
4 Actualizar CoursesPage para incluir las acciones y estados que estamos agregando (funciones mapDispatchToProps y mapStateToProps)

*/
