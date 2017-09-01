import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import NewStudentEntry from './NewStudentEntry.js';
import store, { deleteStudent, removeStudent } from '../store.js'

class StudentsList extends React.Component {
    constructor(props) {
        super(props)
    }



    render() {
        const { students } = this.props;
        
        return (
            <div>
                <ul>
                    {students && students.map(student => {
                        return (
                            <li key={student.id}>
                                <Link to={`/students/${student.id}`}>
                                <div> Name: {student.name}</div>
                                <div>Email: {student.email}</div>
                                <div>Campus: {student.campus.name}</div>
                                </Link>
                                <button onClick={()=> {
                                    this.props.deleteSpecificStudent(student)
                                }}>DELETE</button>
                            </li>
                        )
                    })}
                </ul>
                <NewStudentEntry />
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    students: state.students
  }
}

function mapDispatchStateToProps(dispatch) {
    return {
        deleteSpecificStudent(student) {
            dispatch(removeStudent(student))
            dispatch(deleteStudent(student))
        }
    }
}

const StudentsListContainer = withRouter(connect(mapStateToProps, mapDispatchStateToProps)(StudentsList))
export default StudentsListContainer