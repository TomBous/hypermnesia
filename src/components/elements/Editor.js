import React, {Component} from "react";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

class Editor extends Component {
  state = {
    textMD: "",
  };

  handleChange1 = value => {
    this.setState({
        textMD: value
    });
    this.props.onchange(value, this.props.index);
  };


  render() {
    return (
        <SimpleMDEReact
          className={""}
          value={this.state.textMd}
          onChange={this.handleChange1}
          options={{
              placeholder: "Détaillez l'étape ici",
              renderingConfig: {
                  codeSyntaxHighlighting:true,
              },
          }}
        />
    );
  }
}

export default Editor;