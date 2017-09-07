import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import UpdateStudent from './UpdateStudent';
import store from '../store.js'

class SingleStudent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    render() {
        const { students } = this.props;
        const studentId = Number(this.props.match.params.studentId);
        function findstudent(student) {
            return student.id === studentId
        }
        const student = students && students.find(findstudent);

        return (
        
            <div>
                <div>Name: {student && student.name}</div>
                <div>Email: {student && student.email}</div>
                <Link to={`/campuses/${student && student.campusId}`} ><div>Campus: {student && student.campus.name}</div> </Link>
                <UpdateStudent student={student && student} />
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    students: state.students
  }
}



const SingleStudentContainer = withRouter(connect(mapStateToProps)(SingleStudent))
export default SingleStudentContainer