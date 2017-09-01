import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import store, { createCampus, postCampus, writeCampusName, writeCampusImage } from '../store.js';


class NewCampusEntry extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        const newCampus = {}
        newCampus.name = this.props.newCampusName;
        newCampus.image = this.props.newCampusImage;
        this.props.makeCampus(newCampus);
    }

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Create a Campus</label>
                    <input
                    className="form-control"
                    type="text"
                    name="newCampusName"
                    placeholder="Enter Campus Name"
                    value={this.props.newCampusName}
                    onChange={event => this.props.handleNameChange(event)}
                    
                    />
                    <input
                    className="form-control"
                    type="text"
                    name="newCampusImage"
                    placeholder="Enter Campus Image"
                    value={this.props.newCampusImage}
                    onChange={event => this.props.handleImageChange(event)}
                    
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Create Campus</button>
                </div>
            </form>
        )
    }
}

function mapStateToProps(state) {
  return {
    newCampusName: state.newCampusName,
    newCampusImage: state.newCampusImage
  }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        handleNameChange(event) {
            dispatch(writeCampusName(event.target.value))
        },
        handleImageChange(event) {
            dispatch(writeCampusImage(event.target.value))
        },
        makeCampus(newCampus) {
            dispatch(postCampus(newCampus, ownProps.history))
        }
    }
}

const NewCampusEntryContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry))
export default NewCampusEntryContainer



// value={campus.image}
// onChange={event => this.props.handleChange({name: event.target.value})}