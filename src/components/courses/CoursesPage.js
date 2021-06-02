import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner.js";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = { redirectToAddCoursePage: false };

  componentDidMount() {
    const { courses, authors, actions } = this.props;

    // checking courses.length and authors.length helps to avoid making unnecessary API class each time page loads
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }

  /* handleDeleteCourse = (course) => {
    toast.success("Course deleted");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete failed: " + error.message, { autoClose: false });
    });
  }; */

  // rewrite to use async/await
  handleDeleteCourse = async (course) => {
    toast.success("Course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed: " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h1>Courses</h1>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>

            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// this function determines what state is passed to our component via props
function mapStateToProps(state) {
  // FLOW:
  // 1 when entering the page, courses is empty
  // 5 finally the state contains the course that was added by the reducer
  //debugger;
  return {
    courses:
      // courses and authors loads async, so we need to validate if authors has data
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            // for each course, we create a copy of the full course item and add the corresponding author name
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

// this function determines what actions are available on props in our component
function mapDispatchToProps(dispatch) {
  return {
    // manual
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    // courseActions contains all actions

    // we can specify what actions to include
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

// connect returns a function, that function then calls our component
// when we omit mapDispatchToProps our component gets a dispatch prop injected automatically
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
