import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export default class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: "javascript",
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={tomorrow} showLineNumbers={true} >
        {value}
      </SyntaxHighlighter>
    );
  }
}


/* import React, { PureComponent } from "react";
import PropTypes from "prop-types";
const hljs = window.hljs

export default class CodeBlock extends PureComponent {
  constructor(props) {
    super(props)
    this.setRef = this.setRef.bind(this)
  }

  setRef(el) {
    this.codeEl = el
  }

  componentDidMount() {
    this.highlightCode()
  }

  componentDidUpdate() {
    this.highlightCode()
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl)
  }

  render() {
    return (
      <pre>
      hello
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    )
  }
}

CodeBlock.defaultProps = {
  language: ''
}

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string
} */
