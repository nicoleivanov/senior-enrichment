import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

// Action types
const GET_ALL_CAMPUSES = 'GET_ALL_CAMPUSES'
const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME'
const WRITE_CAMPUS_IMAGE = 'WRITE_CAMPUS_IMAGE'

const ADD_CAMPUS = 'ADD_CAMPUS'
const UPDATE_CAMPUS = 'UPDATE_CAMPUS'
const REMOVE_CAMPUS = 'REMOVE_CAMPUS'

const GET_ALL_STUDENTS = 'GET_ALL_STUDENTS'
const CREATE_STUDENT = 'CREATE_STUDENT'
const ADD_STUDENT = 'ADD_STUDENT'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const REMOVE_STUDENT = 'REMOVE_STUDENT'


// Action type creators
export function getAllCampuses(campuses) {
    return {
        type: GET_ALL_CAMPUSES,
        campuses
    }
}
export function writeCampusName(name) {
    return {
        type: WRITE_CAMPUS_NAME,
        name
    }
}
export function writeCampusImage(image) {
    return {
        type: WRITE_CAMPUS_IMAGE,
        image
    }
}
export function addNewCampusToState(newCampus) {
    return {
        type: ADD_CAMPUS,
        newCampus
    }
}
export function updateCampus(campus) {
    return {
        type: UPDATE_CAMPUS,
        campus
    }
}
export function removeCampus(campus) {
    return {
        type: REMOVE_CAMPUS,
        campus
    }
}


export function getAllStudents(students) {
    return {
        type: GET_ALL_STUDENTS,
        students
    }
}
export function createStudent(newStudent) {
    return {
        type: CREATE_STUDENT,
        newStudent
    }
}
export function addNewStudentToState(newStudent) {
    return {
        type: ADD_STUDENT,
        newStudent
    }
}
export function updateStudent(student) {
    return {
        type: UPDATE_STUDENT,
        student
    }
}
export function removeStudent(student) {
    return {
        type: REMOVE_STUDENT,
        student
    }
}

// Initial state
const initialState = {
    campuses: [],
    newCampusName: '',
    newCampusImage: '',
    students: [],
}


function rootReducer(state=initialState, action) {
    switch(action.type) {
        case GET_ALL_CAMPUSES:
            return Object.assign({}, state, {campuses: action.campuses});
        case WRITE_CAMPUS_NAME:
            return Object.assign({}, state, {newCampusName: action.name});
        case WRITE_CAMPUS_IMAGE:
            return Object.assign({}, state, {newCampusImage: action.image});
        case ADD_CAMPUS:
            return Object.assign({}, state, {campuses: [...state.campuses, action.newCampus]});
        case UPDATE_CAMPUS:
            let updatedCampuses = state.campuses.map(campus => {
                return action.campus.id === campus.id ? action.campus : campus
            })
            return Object.assign({}, state, {campuses: updatedCampuses})
        case REMOVE_CAMPUS:
            let updatedCampuses2 = state.campuses.filter(campus => {
                return campus.id !== action.campus.id
            })
            return Object.assign({}, state, {campuses: updatedCampuses2})

        case GET_ALL_STUDENTS:
            return Object.assign({}, state, {students: action.students});
        case CREATE_STUDENT:
            return Object.assign({}, state, {newStudentEntry: action.newStudent});
        case ADD_STUDENT:
            return Object.assign({}, state, {students: [...state.students, action.newStudent]});
        case UPDATE_STUDENT:
            let updatedStudents = state.students.map(student => {
                return action.student.id === student.id ? action.student : student
            })
            return Object.assign({}, state, {students: updatedStudents});
        case REMOVE_STUDENT:
            let updatedStudents2 = state.students.filter(student => {
                return student.id !== action.student.id
            })
            return Object.assign({}, state, {students: updatedStudents2});
        default:
            return state;
    }
}



// Thunk creators
export function fetchCampuses() {
    return function thunk(dispatch) {
        return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
            const action = getAllCampuses(campuses)
            dispatch(action);
        })
    }
}

export function fetchAllStudents() {
    return function thunk(dispatch) {
        return axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            const action = getAllStudents(students)
            dispatch(action);
        })
    }
}

export function postCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
        .then(res => res.data)
        .then(newCampus => {
            dispatch(addNewCampusToState(newCampus))
            history.push(`/campuses/${newCampus.id}`)
        })
    }
}

export function postStudent(student, history) {
    return function thunk(dispatch) {
        return axios.post('/api/students', student)
        .then(res => res.data)
        .then(newStudent => {
            dispatch(addNewStudentToState(newStudent))
            history.push(`/students/${newStudent.id}`)
        })
    }
}

export function deleteStudent(student) {
    return function thunk(dispatch) {
        return axios.delete(`api/students/${student.id}`)
    }
}

export function deleteCampus(campus, history) {
    return function thunk(dispatch) {
        return axios.delete(`api/campuses/${campus.id}`)
        .then(() => {
            history.push(`/campuses`)
        })
    }
}

export function updateStudentdb(student) {
    return function thunk(dispatch) {
        return axios.put(`api/students/${student.id}`)
        .then(student => {
            dispatch(updateStudent(student))
        })
    }
}


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
