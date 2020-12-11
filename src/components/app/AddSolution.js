import React, { useState, Fragment, useEffect } from 'react';
import { PropTypes } from "prop-types";
import Editor from '../elements/Editor'
import { useSelector, useDispatch } from "react-redux"
import { addSolution } from "../../actions/solutionsActions"
import './AddSolution.css';
// import Editor from 'react-markdown-editor-lite';

export default function AddSolution(props) {
  const idUser = useSelector(state => state.security.user.result.id); // On récupère direct depuis redux
  const [inputFields, setInputFields] = useState([{
    stepNb: "",
    stepTitle: "",
    stepContent: ""
  }]);
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  
  const solutions = useSelector(state => state.knowledge.solutions);
  useEffect(() => {
    console.log("USEEE EFFECCTTT")
    if (sending) {
    console.log("swwiiiitcchhhh viiiewww :", solutions.length)
    props.selectSolution(solutions.length - 1)
    props.switchView("solutions")
    }
  }, [solutions])

  const handleSubmit = (e) => {
    e.preventDefault();
    const solution = {
      idUser: idUser,
      idKnowledge: props.idKnowledge,
      inputFields: inputFields
    }
    console.log("Solution : ", solution);
    if (!sending) {
    dispatch(addSolution(solution, props.history));
    setSending(true);
    }
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
              <button className="btn btn-danger" onClick={() => props.switchView("overview")}>Annuler</button>
              {!sending && <button className="btn btn-primary" type="submit" onClick={(e) => handleSubmit(e)}>Sauvegarder</button>}
              {sending && <button className="btn btn-primary saving">En cours<span>.</span><span>.</span><span>.</span></button>}  {/* css loader saving */}
              <i className="btn-round-plus fas fa-3x fa-plus-circle" onClick={() => handleAddFields()}></i>
            </div>
          </form>
        </div>
        <div className="context_container"></div>

      </div>
    </div>
  );
}
AddSolution.propTypes = {
  solViewer: PropTypes.func.isRequired,
}