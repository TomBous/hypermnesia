import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PublicRoute = ({component: Component, security, ...otherProps}) => (
    <Route {...otherProps} render={(props) => security.validToken === false ? (<Component {...props} />) : (<Redirect to="/dashboard"/>)}/>
);

PublicRoute.propTypes = {
    security: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    security: state.security,
});

export default connect(mapStateToProps)(PublicRoute);