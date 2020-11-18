import React, { useState, Fragment } from 'react';
import { PropTypes } from "prop-types";
import Editor from '../elements/Editor'
import { connect } from "react-redux"
import { addSolution } from "../../actions/solutionsActions"
import './Solution.css';
// import Editor from 'react-markdown-editor-lite';

function Solution(props) {
  const [inputFields, setInputFields] = useState([{
    stepNb: "",
    stepTitle: "",
    stepContent: ""
  }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const solution = {
      idUser: props.security.user.result.id,
      idKnowledge: props.idKnowledge,
      inputFields: inputFields
    }
    console.log("Solution : ", solution);
    props.addSolution(solution, props.history);
  }
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "stepTitle") {
      values[index].stepNb = event.target.previousSibling.value; // pour recuperer la valeur de l'input hidden
      values[index].stepTitle = event.target.value;
    } else {
      values[index].stepContent = event.target.value;
    }
    setInputFields(values);
  };
  const handleEditorChange = (value, index) => {
    const values = [...inputFields];
    values[index].stepContent = value;
    setInputFields(values);
  }
  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ stepNb: '', stepTitle: '', stepContent: '' });
    setInputFields(values);
  };
  const handleRemoveFields = () => {
    const values = [...inputFields];
    values.pop();
    setInputFields(values);
  };
  return (
    <div className="flex-container">
      <div className="flex fcolumn">
        <div className="solution_container">
          <form onSubmit={handleSubmit}>
            {inputFields.map((inputField, index) => (
              <Fragment key={`${inputField}~${index}`}>
                <div className="step_solution">
                  <div className="step_content">
                    <div className="step_num">{index + 1}°</div>
                    <input type="hidden" name="stepNb" id="stepNb" value={index + 1} required="required" />
                    <input type="text" name="stepTitle" id="stepTitle" placeholder="[Titre/Résumé] de l'étape" value={inputFields.stepTitle} onChange={event => handleInputChange(index, event)} required="required" />
                    <Editor onchange={(value, index) => handleEditorChange(value, index)} index={index} />
                  </div>
                </div>
              </Fragment>
            ))}
            <div className="flex fcenter mgb-30">
              <i className="btn-round-minus fas fa-3x fa-minus-circle" onClick={() => handleRemoveFields()}></i>
              <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Sauvegarder</button>
              <i className="btn-round-plus fas fa-3x fa-plus-circle" onClick={() => handleAddFields()}></i>
            </div>
          </form>
        </div>
        <div className="context_container"></div>

      </div>
    </div>
  );
}
Solution.propTypes = {
  addSolution: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
  return {
    security: state.security,
  };
}
export default connect(mapStateToProps, { addSolution })(Solution);