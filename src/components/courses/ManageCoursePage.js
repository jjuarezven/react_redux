import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class ManageCoursePage extends React.Component {
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

  render() {
    return (
      <>
        <h1>Manage Course</h1>
      </>
    );
  }
}

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// this function determines what state is passed to our component via props
function mapStateToProps(state) {
  // FLOW:
  // 1 when entering the page, courses is empty
  // 5 finally the state contains the course that was added by the reducer
  //debugger;
  return {
    courses: state.courses,
    authors: state.authors
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
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch)
    }
  };
}

// connect returns a function, that function then calls our component
// when we omit mapDispatchToProps our component gets a dispatch prop injected automatically
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
