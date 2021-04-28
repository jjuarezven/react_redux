import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage extends React.Component {
  componentDidMount() {
    this.props.actions.loadCourses().catch((error) => {
      alert("Loading courses failed " + error);
    });
  }

  render() {
    return (
      <>
        <h1>Courses</h1>

        {this.props.courses.map((course) => (
          <div key={course.title}>{course.title}</div>
        ))}
      </>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

// this function determines what state is passed to our component via props
function mapStateToProps(state) {
  // FLOW:
  // 1 when entering the page, courses is empty
  // 5 finally the state contains the course that was added by the reducer
  //debugger;
  return {
    courses: state.courses,
  };
}

// this function determines what actions are available on props in our component
function mapDispatchToProps(dispatch) {
  return {
    // manual
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    // courseActions contains all actions
    actions: bindActionCreators(courseActions, dispatch),
  };
}

// connect returns a function, that function then calls our component
// when we omit mapDispatchToProps our component gets a dispatch prop injected automatically
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
