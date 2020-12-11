import React, { Component } from 'react'
import "./header.css"
import logo from '../../images/website/hypermnesia-logo.png'
import { connect } from "react-redux";
import { logout } from "../../actions/userActions"
import { findPerspectives, setPerspective, findTags } from "../../actions/dashboardActions"
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import Select from 'react-select';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            selectedOption: null,
        };
        this.getPerspectives = this.getPerspectives.bind(this);
    };
    getPerspectives() {
        this.props.findPerspectives();
    }
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        this.props.setPerspective(selectedOption.value);
        let data = {
            idPerspective: selectedOption.value,
        }
        this.props.findTags(data);
    };
    logout() {
        this.props.logout();
        window.location.href = "/";
    }
    componentWillMount() {
        this.props.findPerspectives();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dashboard.perspectivesList) {
            // Mise en place d'une perspective par defaut
            if (this.state.selectedOption === null) {
                this.props.setPerspective(this.props.dashboard.perspectivesList[0].value);
                let data = {
                    idPerspective: this.props.dashboard.perspectivesList[0].value,
                }
                this.props.findTags(data);
                this.setState({
                    selectedOption: this.props.dashboard.perspectivesList[0],
                })
            }
            // Mise en place des options du select
            if (this.props.dashboard.perspectivesList !== undefined && this.props.dashboard.perspectivesList !== prevProps.dashboard.perspectivesList) {
                this.setState({
                    options: this.props.dashboard.perspectivesList,
                })
            }
        }
    }

    render() {
        const { validToken, user } = this.props.security;
        const { selectedOption, options } = this.state;
        const selectStyle = {
            menu: (provided, state) => ({
                ...provided,
                color: '#555',
            }),
            placeholder: (provided) => ({
                ...provided,
            }),
        }
        const userIsAuthenticated = (
            <>
            <Select
                className="select-container"
                styles={selectStyle}
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                placeholder={"Quelle perspective ?"}
                theme={theme => ({
                    ...theme,
                    borderRadius: 5,
                    colors: {
                        ...theme.colors,
                        primary25: 'rgb(221, 221, 221)',
                        primary75: 'rgba(93, 129, 172, 0.75)',
                        primary: 'rgba(93, 129, 172, 1)',
                    },
                })}
            />
            <div className="navigation">
                <ul>
                    <li>
                        <Link data-tip="Mon compte" to="/account">
                            {validToken ? user.result.firstname + " " + user.result.lastname.toUpperCase() : ""}
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout" onClick={this.logout.bind(this)}>
                            <i data-tip="Déconnexion" className="fas fa-2x fa-sign-out-alt"></i>
                        </Link>
                    </li>
                </ul>
            </div>
            </>
        );
        const userIsNotAuthenticated = (
            <div className="navigation">
                <ul>
                    <li>
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            Inscription
                        </Link>
                    </li>
                </ul>
            </div>
        );
        let navigation;
        if (validToken && user) {
            navigation = userIsAuthenticated;
        } else {
            navigation = userIsNotAuthenticated;
        }
        
        return (
            <header>
                <ReactTooltip effect="solid" />
                <nav>
                    <div id="logo">
                        <Link to="/dashboard">
                            <img src={logo} alt="logo" />
                            <h1>Hypermnesia</h1>
                        </Link>
                    </div>
                    {navigation}
                </nav>
            </header>
        )
    }
}
Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    findPerspectives: PropTypes.func.isRequired,
    findTags: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    security: state.security,
    dashboard: state.dashboard,
})
export default connect(mapStateToProps, { logout, findPerspectives, setPerspective, findTags })(Header);

//*HACK: Pk il rentre dans le userIsAuthenticated alors que le token est false ? 