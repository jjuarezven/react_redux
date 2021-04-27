// this is the action creator function
import * as types from "./actionTypes";

export function createCourse(course) {
  // FLOW:
  // 3 create a new course and action is managed by reducer

  //debugger;
  return { type: types.CREATE_COURSE, course };
}
