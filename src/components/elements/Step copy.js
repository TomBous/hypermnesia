import React, { Component, useState } from 'react'
import './step.css'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import Editor from './Editor';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
const hljs = window.hljs;


function MarkdownEditor() {
    const [markdown, setMarkdown] = useState('')

    function handleChange(e) {
        setMarkdown(e.target.value);
        hljs.initHighlightingOnLoad();
    }

    return (
        <div className='app'>
            <textarea
                onChange={handleChange}
                value={markdown}
            />
            <ReactMarkdown className="preview" source={markdown}  />
        </div>

    )
}


export default class Step extends Component {
    render() {
        let blockCode;
        if (this.props.code) {
           blockCode = (
            <SyntaxHighlighter language="javascript" style={tomorrow}>
                {this.props.code}
            </SyntaxHighlighter>
           )
        } else {
            blockCode = (
                <div></div>
            )
        }
        return (
            <div className="step">
                <img src={this.props.img} alt=""/>
                <div className="step_content">
                    <div className="step_num">{this.props.num}°</div>
                    <div className="title">{this.props.title}</div>
                    {/* <div><ReactMarkdown source={input} renderers={{ code: CodeBlock }}/></div> */}
                    {blockCode}
                    <div>{this.props.content}</div>
                    <MarkdownEditor renderers={{code: CodeBlock}}/>
                    <Editor />
                </div>
            </div>
        )
    }
}
