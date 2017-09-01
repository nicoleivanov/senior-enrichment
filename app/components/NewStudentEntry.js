import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store, { createCampus, postCampus, writeCampusName, writeCampusImage, postStudent } from '../store.js';


class NewStudentEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            campus: '',
            campusId: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        const prop = event.target.name
        switch(prop) {
            case 'name':
                return this.setState({
                    name: event.target.value
                })
            case 'email':
                return this.setState({
                    email: event.target.value
                })
            case 'campus':
                return this.setState({
                    campus: event.target.value
                })
        }
    }

    handleSubmit(event) {
        event.preventDefault()
        const campus = this.props.campuses.find(campus => {
            return campus.name === this.state.campus
        })
        const campusId = this.props.campuses && campus.id
        const newStudent = this.state
        newStudent.name = this.state.name;
        newStudent.email = this.state.email;
        newStudent.campusId = campusId
        this.props.makeStudent(newStudent);

    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Create a Student</label>
                    <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Enter Student Name"
                    value={this.state.name}
                    onChange={event => this.handleChange(event)}
                    />
                    <input
                    className="form-control"
                    type="text"
                    name="email"
                    placeholder="Enter Student Email"
                    value={this.state.email}
                    onChange={event => this.handleChange(event)}
                    />
                    <input
                    className="form-control"
                    type="text"
                    name="campus"
                    placeholder="Enter Student Campus"
                    value={this.state.campus}
                    onChange={event => this.handleChange(event)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Create Student</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        campuses: state.campuses
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        makeStudent(newStudent) {
            dispatch(postStudent(newStudent, ownProps.history))
        }
    }
}

const NewStudentEntryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewStudentEntry))
export default NewStudentEntryContainer