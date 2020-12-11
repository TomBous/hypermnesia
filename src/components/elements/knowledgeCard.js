import React, { Component } from 'react'
import cardImage from '../../images/website/book-page.jpg'
import { Link } from "react-router-dom";

export default class KnowledgeCard extends Component {
    render() {
        let tags = [];
        tags = this.props.tags.map((tag, index) => <div key={index} className="tag">{tag}</div>);
        
        return (
            <div className="knowledge-card">
                <div className="knowledge-header">
                    <img src={cardImage} alt="" />
                    <svg className="favorite" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
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
