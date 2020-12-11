import React, { useState, useEffect, useCallback } from 'react';
import { PropTypes } from "prop-types";
import Editor from '../elements/Editor'
import SolutionCard from '../elements/SolutionCard'
import InformationCard from '../elements/InformationCard'
import { useSelector, useDispatch } from "react-redux"
import { findContexts, deleteContext } from "../../actions/contextsActions"
import { findConstraints, deleteConstraint } from "../../actions/constraintActions"
import './Overview.css';
import AddContext from '../elements/AddContext'
import AddConstraint from '../elements/AddConstraint'
// import Editor from 'react-markdown-editor-lite';

export default function Overview(props) {
  const [addType, setAddType] = useState("");
  const [solutions, setSolutions] = useState(props.solutions); // On récupère les solutions réorganisées dans Knowledge.js
  const contexts = useSelector(state => state.knowledge.informations.contexts); // On récupère direct depuis redux
  const constraints = useSelector(state => state.knowledge.informations.constraints); // On récupère direct depuis redux
  const dispatch = useDispatch();

  const viewSolution = (number) => {
    props.switcher("solutions");
    props.solViewer(number);
  };

  const removeContext = (idContext) => {
    dispatch(deleteContext(idContext, props.idKnowledge));
  }
  const removeConstraint = (idConstraint) => {
    dispatch(deleteConstraint(idConstraint, props.idKnowledge));
  }

  useEffect(() => {
      dispatch(findContexts(props.idKnowledge));
      dispatch(findConstraints(props.idKnowledge));
  }, []) // run once

  
  let solutionsList = [];
  if (Array.isArray(solutions)) {
    solutionsList = solutions.map((solution, index) => (
    <SolutionCard key={solution[0].id_solution} index={index} content={solution.map((sol) => { return sol.title })} votes={solution[0].counter_vote} onclick={() => viewSolution(index)}/>
  ))
  }

  let contextsList = typeof contexts[0] !== "string" ? contexts.map((context) => <InformationCard key={context.id} information={context} delete={removeContext}/>) : "";
  let constraintsList = typeof constraints[0] !== "string" ? constraints.map((constraint) => <InformationCard key={constraint.id} information={constraint} delete={removeConstraint}/>) : "";
  


  return (
    <div className="flex frow faround">
    {addType === "constraint" && <AddConstraint idKnowledge={props.idKnowledge} close={setAddType}/>}
    {addType === "context" && <AddContext idKnowledge={props.idKnowledge} close={setAddType}/>}
      <div className="solutions_container flex fcolumn">
        <div className="flex frow fcenter fmiddle mgb-30">
          <h1>Solutions</h1>
          <i className="btn-round-plus fas fa-2x fa-plus-circle" onClick={() => props.switcher("addSolution")}></i>
        </div>
        {solutionsList}
      </div>
      <div className="contexts_container flex fcolumn">
        <div className="flex frow fcenter fmiddle mgb-30">
          <h1>Contextes</h1>
          <i className="btn-round-plus fas fa-2x fa-plus-circle" onClick={() => setAddType("context")}></i>
        </div>
        {contextsList}
      </div>
      <div className="constraints_container flex fcolumn">
        <div className="flex frow fcenter fmiddle mgb-30">
          <h1>Contraintes</h1>
          <i className="btn-round-plus fas fa-2x fa-plus-circle" onClick={() => setAddType("constraint")}></i>
        </div>
        {constraintsList}
      </div>
      <div className="ressources_container flex fcolumn">
        <div className="flex frow fcenter fmiddle mgb-30">
          <h1>Ressources</h1>
          <i className="btn-round-plus fas fa-2x fa-plus-circle"></i>
        </div>
      </div>
    </div>
  );
}
Overview.propTypes = {
  findContexts: PropTypes.func.isRequired,
  findConstraints: PropTypes.func.isRequired,
}