import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store, { updateStudentdb } from '../store.js';


class UpdateStudent extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(event) {
        event.preventDefault()
        const studentId = Number(this.props.match.params.studentId)
        const newStudent = {
            id: studentId,
            name: event.target.name.value,
            email: event.target.email.value,
            campusId: event.target.campus.value
        }
        this.props.updateStudent(newStudent)
    }

    render() {

      return (
          <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Update a Student</label>
                    <input className="form-control" type="text" name="name" placeholder="Enter Name"
                    />
                    <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    />
                    <select name="campus">
                        {
                        this.props.campuses && this.props.campuses.map(campus => {
                            return <option key={campus.id} value={campus.id}>{campus.name}</option>
                        })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Update Student</button>
                </div>
            </form>
      )  
    }
}

function mapStateToProps(state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateStudent(student) {
            dispatch(updateStudentdb(student, ownProps.history))
        }
    }
}

const UpdateStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateStudent))
export default UpdateStudentContainer