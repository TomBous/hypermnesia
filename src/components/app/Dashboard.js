import React, { Component } from 'react'
import Sidebar from '../layout/sidebar'
import KnowledgeCard from '../elements/knowledgeCard'
import { connect } from "react-redux"
import { findPinnedKn } from "../../actions/dashboardActions"
import { PropTypes } from "prop-types";
import SearchBox from "../elements/SearchBox"

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'knowledges': "",
            'tagList': "",
        };

    }
    static getDerivedStateFromProps(props, state) {
        if (props.dashboard) {
            return {
                knowledges: props.dashboard.knowledges,
                tagList: props.dashboard.tagList
            }
        }
    }
    render() {
        let knowledges = this.state.knowledges;
        let tagList = this.state.tagList;
        let cards = [];
        if (knowledges !== undefined && knowledges !== "" && tagList !== undefined) {
            knowledges.forEach(knowledge => {
                knowledge.tags = [];
                tagList.forEach(tag => {
                    if (knowledge.id === tag.id_knowledge) {
                        knowledge.tags.push(tag.name);
                    }
                })
            });
            cards = knowledges.map(knowledge => <KnowledgeCard key={knowledge.id} id={knowledge.id} problematic={knowledge.problematic} tags={knowledge.tags} />)
        } else {
            cards = <div className="no_result"><h1>Auncun savoir</h1></div>
        }
        return (
            <div className="flex">
                <Sidebar />
                <div className="dashboard-container">
                    <SearchBox />
                    <div className="flex frow fcenter">
                        {cards}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard
    };
}
export default connect(mapStateToProps)(Dashboard);
