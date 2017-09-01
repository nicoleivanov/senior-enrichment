import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../store.js'

class StudentsByCampus extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { students } = this.props;
        const campusId = Number(this.props.match.params.campusId);
        const campusStudents = students.filter(student => {
            return student.campusId === campusId
        })

        return (
            <ul>
                {campusStudents && campusStudents.map(student => {
                    return (
                        <li key={student.id}>
                            <Link to={`/students/${student.id}`}>
                            <div>{student.name}</div>
                            <div>{student.email}</div>
                            <div>{student.campus.name}</div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

function mapStateToProps(state) {
  return {
    students: state.students
  }
}

const StudentsByCampusContainer = withRouter(connect(mapStateToProps)(StudentsByCampus))
export default StudentsByCampusContainer