import React, { Component } from 'react'
import Input from '../elements/inputs'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/userActions";
import { PropTypes } from "prop-types";


class Login extends Component {
    componentDidMount() {
        var inputs = document.querySelectorAll('div.js_input');
        document.querySelector('input[type="submit"]').onclick = function() {
            inputs.forEach((input) => {
                console.log(input);
                if (!input.children[1].value) {
                    input.classList.add("invalid");
                }
            })
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            'email': "",
            'password':"",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    };
    componentDidUpdate(prevProps) {
        if (this.props.errors.message && this.props.errors !== prevProps.errors) {
            this.setState({
                'error': this.props.errors.message,
            })
        }
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit(e) {
        e.preventDefault();
        const loginData = {
            'email': this.state.email,
            'password':this.state.password
        }
        this.props.login(loginData, this.props.history);
    };
    render() {
        const ShowError = () => {
            if (this.state.error) {
               return <div className="error">{this.state.error}</div>;
            } else {
                return null;
            }
        }
        return (
            <div className="flex-container">
            <div className="login card flex frow fcolumn fcenter">
                <div className="card-header">
                    <h1>Project Hypermnesia</h1>
                </div>
                <form onSubmit={this.onSubmit}>
                <div className="card-content flex fcolumn">
                    <ShowError />
                    <Input type="email" name="email" icon="fa-at" placeholder="Votre email" value={this.state.email} onchange={this.onChange} required="required"/>
                    <Input type="password" name="password" icon="fa-key" placeholder="Mot de passe" value={this.state.password} onchange={this.onChange} required="required"/>
                    <div className="tcenter"><Link to="/register">Créer un compte ?</Link></div>
                </div>
                <div className="card-footer flex fcolumn fmiddle">
                    <input type="submit" className="btn btn-success" value="Connexion"/>
                </div>
                </form>
            </div>
            </div>
        )
    }
}
Login.propTypes = {
    login: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    return {
        security : state.security,
        errors: state.errors,
    };
  }
export default connect(mapStateToProps, { login })(Login);