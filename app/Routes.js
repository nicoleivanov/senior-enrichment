import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import history from './history'
import Root from './components/Root.js'
import Home from './components/Home.js'
import CampusesList from './components/CampusesList.js'
import StudentsList from './components/StudentsList.js'
import SingleCampus from './components/SingleCampus.js'
import StudentsByCampus from './components/StudentsByCampus.js'
import SingleStudent from './components/SingleStudent'
import NewCampusEntry from './components/NewCampusEntry'
import NewStudentEntry from './components/NewStudentEntry'
import UpdateStudent from './components/UpdateStudent'
import store, { fetchCampuses, fetchAllStudents } from './store.js'

export default class Routes extends Component {

    componentDidMount() {
        store.dispatch(fetchCampuses())
        store.dispatch(fetchAllStudents())
    }

    render() {
        return(
            <Router history={history}>
                <Root>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/campuses" component={CampusesList} />
                         <Route exact path="/campuses/:campusId" component={SingleCampus} /> 
                        <Route exact path="/students" component={StudentsList} />
                        <Route exact path="/campuses/:campusId/students" component={StudentsByCampus} />
                        <Route exact path="/students/:studentId" component={SingleStudent} />
                        <Route exact path="/new-campus" component={NewCampusEntry} />
                        <Route exact path="/new-student" component={NewStudentEntry} />
                        <Route exact path="/students/:studentId/update-student" component={UpdateStudent} />
                    </Switch>
                </Root>
            </Router>
        )
    }
}



