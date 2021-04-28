// this is the action creator function
import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";

export function createCourse(course) {
  // FLOW:
  // 3 create a new course and action is managed by reducer

  //debugger;
  return { type: types.CREATE_COURSE, course };
}

export function loadCourseSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses,
  };
}

export function loadCourses() {
  // thunk injects dispatch so we don't have to
  return function (dispatch) {
    debugger;
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
}
