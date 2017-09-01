import React from 'react';
import CampusesList from './CampusesList'
import NewStudentEntry from './NewStudentEntry'

const Home = () => {
    return (
        <div className="center-block">
            You are home!
            <CampusesList />
        </div>
    )
}

export default Home;