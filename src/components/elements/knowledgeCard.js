import React, { Component } from 'react'
import cardImage from '../../images/website/book-page.jpg'
import { Link } from "react-router-dom";

export default class KnowledgeCard extends Component {
    render() {
        let tags = [];
        tags = this.props.tags.map(tag => <div className="tag">{tag}</div>);
        
        return (
            <div className="knowledge-card">
                <div className="knowledge-header">
                    <img src={cardImage} alt=""/>
                </div>
                <div className="knowledge-content">
                    <Link to={`/knowledge/${this.props.id}`}>
                        <h3>{this.props.problematic}</h3>
                    </Link>
                    <div className="flex frow">
                        {tags}
                    </div>
                </div>
                <div className="knowledge-footer">
                    <i className="fas fa-heart"></i>
                    <div className="label-green">2 solutions</div>
                    <div>
                        <i className="fas fa-thumbs-down"></i>
                        <i className="fas fa-thumbs-up mgl-10"></i>
                    </div>
                    
                </div>
                    
            </div>
        )
    }
}
