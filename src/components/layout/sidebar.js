import React, { Component } from 'react'
import SidebarItem from '../layout/sidebarItem'
import { connect } from "react-redux"
import { findPinnedKn, findMyKn, findFavKn, findTrendingKn, findLastKn, findUsefullKn, findTopFavKn, findFlaggedKn } from "../../actions/dashboardActions"
import { PropTypes } from "prop-types";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'getter': ""
        };
        this.getPinnedKn = this.getPinnedKn.bind(this);
        this.getMyKn = this.getMyKn.bind(this);
        this.getFavKn = this.getFavKn.bind(this);
        this.getTrendingKn = this.getTrendingKn.bind(this);
        this.getLastKn = this.getLastKn.bind(this);
        this.getUsefullKn = this.getUsefullKn.bind(this);
        this.getTopFavKn = this.getTopFavKn.bind(this);
        this.getFlaggedKn = this.getFlaggedKn.bind(this);

    }
    getPinnedKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
        };
        this.props.findPinnedKn(data, this.props.history);
        this.setState({ getter: "pinned" });
    }
    getMyKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
            'idUser': this.props.security.user.result.id
        };
        this.props.findMyKn(data, this.props.history);
        this.setState({ getter: "mines" });
    }
    getFavKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
            'idUser': this.props.security.user.result.id
        };
        this.props.findFavKn(data, this.props.history);
        this.setState({ getter: "favorited" });
    }
    getTrendingKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
        };
        this.props.findTrendingKn(data, this.props.history);
        this.setState({ getter: "trending" });
    }
    getLastKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
        };
        this.props.findLastKn(data, this.props.history);
        this.setState({ getter: "last" });
    }
    getUsefullKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
        };
        this.props.findUsefullKn(data, this.props.history);
        this.setState({ getter: "usefull" });
    }
    getTopFavKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
        };
        this.props.findTopFavKn(data, this.props.history);
        this.setState({ getter: "topfav" });
    }
    getFlaggedKn() {
        const data = {
            'idPerspective': this.props.dashboard.perspective,
        };
        this.props.findFlaggedKn(data, this.props.history);
        this.setState({ getter: "flagged" });
    }
    componentDidUpdate(prevProps) {
        if (this.props.dashboard.perspective !== prevProps.dashboard.perspective) {
            switch (this.state.getter) {
                case "pinned":
                    this.getPinnedKn();
                    break;
                case "mines":
                    this.getMyKn();
                    break;
                case "favorited":
                    this.getFavKn();
                    break;
                case "trending":
                    this.getTrendingKn();
                    break;
                case "last":
                    this.getLastKn();
                    break;
                case "usefull":
                    this.getUsefullKn();
                    break;
                case "topfav":
                    this.getTopFavKn();
                    break;
                case "flagged":
                    this.getFlaggedKn();
                    break;
                default:
                    this.getPinnedKn();
            }
        }
    }

    render() {
        return (
            <div className="sidebar">
                <ul>
                    <SidebarItem function={this.getPinnedKn} active={this.state.getter === "pinned" ? 'active' : ''} name="Mis en avant" icon="fa-rss-square" color="#ebcb8b" />
                    <SidebarItem function={this.getMyKn} active={this.state.getter === "mines" ? 'active' : ''} name="Mes savoirs" icon="fa-book" color="#8D6E63" />
                    <SidebarItem function={this.getFavKn} active={this.state.getter === "favorited" ? 'active' : ''} name="Mes favoris" icon="fa-heart" color="#FF6666" />
                    <SidebarItem function={this.getTrendingKn} active={this.state.getter === "trending" ? 'active' : ''} name="Trending" icon="fa-chart-line" color="#339999" />
                    <SidebarItem function={this.getLastKn} active={this.state.getter === "last" ? 'active' : ''} name="Récent" icon="fa-history" color="#317A99" />
                    <SidebarItem function={this.getUsefullKn} active={this.state.getter === "usefull" ? 'active' : ''} name="Top utiles" icon="fa-award" color="#33CC00" />
                    <SidebarItem function={this.getTopFavKn} active={this.state.getter === "topfav" ? 'active' : ''} name="Top favoris" icon="fa-gem" color="#993399" />
                    <SidebarItem function={this.getFlaggedKn} active={this.state.getter === "flagged" ? 'active' : ''} name="A améliorer" icon="fa-exclamation-circle" color="#FF9966" />
                </ul>
            </div>
        )
    }
}
Sidebar.propTypes = {
    findPinnedKn: PropTypes.func.isRequired,
    findMyKn: PropTypes.func.isRequired,
    findFavKn: PropTypes.func.isRequired,
    findTrendingKn: PropTypes.func.isRequired,
    findLastKn: PropTypes.func.isRequired,
    findUsefullKn: PropTypes.func.isRequired,
    findTopFavKn: PropTypes.func.isRequired,
    findFlaggedKn: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
        security: state.security
    };
}
export default connect(mapStateToProps, { findPinnedKn, findMyKn, findFavKn, findTrendingKn, findLastKn, findUsefullKn, findTopFavKn, findFlaggedKn })(Sidebar);