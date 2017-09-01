import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store from '../store.js'
import NewCampusEntry from './NewCampusEntry.js'

class CampusesList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { campuses } = this.props;
        var imgStyle = {
            height: 100,
            width: 100
        }
        return (
            <div>
                <ul>
                    {campuses.map(campus => {
                        return (
                            <li key={campus.id}>
                                <Link to={`/campuses/${campus.id}`}>
                                <span>{campus.name}</span>
                                <div><img style={imgStyle} src={campus.image}/></div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                <NewCampusEntry />
            </div>
        )
    }
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses
  }
}

const CampusesListContainer = withRouter(connect(mapStateToProps)(CampusesList))
export default CampusesListContainer