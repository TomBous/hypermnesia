import React, { Component, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import './step.css'



export default class Step extends Component {

    render() {
        const regex = /\\n/gi;
        const content = typeof this.props.content ==='string' ? this.props.content.replace(regex, "\n") : ""; // Permet de rehabiliter les retours à la ligne
        return (
            <div className="step">
                {this.props.img && <img src={this.props.img} alt="" />}
                <div className="step_content">
                    <div className="step_num">{this.props.num}°</div>
                    <div className="title">{this.props.title}</div>
                    <div className="content"><ReactMarkdown source={content} renderers={{ code: CodeBlock }} /></div>
                </div>
            </div>
        )
    }
}