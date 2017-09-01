import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store, { deleteCampus, removeCampus } from '../store.js';
import StudentsByCampus from './StudentsByCampus';

class SingleCampus extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { campuses } = this.props;
        const campusId = Number(this.props.match.params.campusId);
        function findCampus(campus) {
            return campus.id === campusId
        }

        const campus = campuses.find(findCampus)
        return (
            <div>
                <h1>{campus && campus.name}</h1>
                <button onClick={() => {
                    this.props.deleteSpecificCampus(campus)
                }}>DELETE</button>
                <StudentsByCampus />
            </div>
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
        deleteSpecificCampus(campus) {
            dispatch(deleteCampus(campus, ownProps.history))
            dispatch(removeCampus(campus))
        }
    }
}

const SingleCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCampus))
export default SingleCampusContainer