import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../elements/inputs";
import "./account.css";
import { editUser } from "../../actions/userActions"
import { PropTypes } from "prop-types";


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.security.user.result.firstname,
            lastName: this.props.security.user.result.lastname,
            email: this.props.security.user.result.email,
            editMode : false,
        };
        this.toggleMode = this.toggleMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    toggleMode() {
        this.setState( (prevState) => {
           return { editMode: !prevState.editMode}
        })
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit(e) {
        e.preventDefault();
        const editedUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            id: this.props.security.user.result.id
        }
        //console.log(newUser);
        this.props.editUser(editedUser, this.props.history);
        this.toggleMode();
    }

    render() {
        const readOnly = (
            <div className="fake_input flex fcolumn">
                <div>Prénom : <span>{this.state.firstName}</span></div>
                <div>Nom : <span>{this.state.lastName}</span></div>
                <div>Email : <span>{this.state.email}</span></div>
                <div className="flex fcolumn fmiddle">
                <input type="submit" onClick={this.toggleMode} className="btn btn-success" value="Modifier"/>
                </div>
            </div>
        )
        const editMode = (
            <form id="edit_form" onSubmit={this.onSubmit}>
                <div className="flex fcolumn">
                    <Input type="text" name="firstName" icon="fa-user" placeholder="Votre prénom" value={this.state.firstName} onchange={this.onChange} required="required"/>
                    <Input type="text" name="lastName" icon="fa-user-tag" placeholder="Votre nom" value={this.state.lastName} onchange={this.onChange} required="required"/>
                    <Input type="email" name="email" icon="fa-at" placeholder="Votre email" value={this.state.email} onchange={this.onChange} required="required"/>
                </div>
                
                <div className="flex fcolumn fmiddle">
                    <input type="submit" className="btn btn-success" value="Valider"/>
                </div>
            </form>
        )
        let informations;
        if (this.state.editMode === false) {
            informations = readOnly;
        } else if (this.state.editMode === true) {
            informations = editMode;
        }

        return (
            <div className="full-container">
                <div className="flex-container mgt-50">
                    <Link to="/dashboard"><i class=" btn-round fas fa-3x fa-arrow-circle-left"></i></Link>
                    <div className="flex-container">
                    <h1>Mon compte</h1>
                    {informations}
                    </div>
                </div>
            </div>
        )
    }
}
Account.propTypes = {
    editUser: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    return {
        security : state.security,
    };
  }
export default connect(mapStateToProps, {editUser})(Account);