import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";

class CoursesPage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //  since we didn't declare mapDispatchToProps, connect automatically adds Dispatch as a prop
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />
        <button type="submit">Save</button>
      </form>
    );
  }
}

CoursesPage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
};

// this function determines what state is passed to our component via props
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}
// connect returns a function, that function then calls our component
// when we omit mapDispatchToProps our component gets a dispatch prop injected automatically
export default connect(mapStateToProps)(CoursesPage);
