import React, { useState, useEffect } from 'react';
import { PropTypes } from "prop-types";
import Editor from '../elements/Editor'
import SmallCard from '../elements/SmallCard'
import { useSelector, useDispatch } from "react-redux"
import { findContexts } from "../../actions/contextsActions"
import { findConstraints } from "../../actions/constraintActions"
import './Overview.css';
// import Editor from 'react-markdown-editor-lite';

export default function Solution(props) {
  const [status, setStatus] = useState('idle');
  const [solutions, setSolutions] = useState(props.solutions); // On récupère les solutions réorganisées dans Knowledge.js
  const contexts = useSelector(state => state.knowledge.informations.contexts); // On récupère direct depuis redux
  const constraints = useSelector(state => state.knowledge.informations.constraints); // On récupère direct depuis redux
  const dispatch = useDispatch();

  const viewSolution = (number) => {
    props.switcher("solutions");
    props.solViewer(number);
  };

  useEffect(() => {
    if (status === "idle") {
    dispatch(findContexts(props.idKnowledge));
    dispatch(findConstraints(props.idKnowledge));
    setStatus('fetched');
    }
    return;
  }, [contexts])
  
  let solutionsList = [];
  if (Array.isArray(solutions)) {
    solutionsList = solutions.map((solution, index) => (
    <SmallCard type="solution" key={solution[0].id_solution} content={solution.map((sol) => { return sol.title })} votes={solution[0].counter_vote} onclick={() => viewSolution(index)}/>
  ))
  }

  let contextsList = [], constraintsList = [];
  if (typeof contexts[0] !== "string") { // On check que le premier élément du tableau est différent d'une string (ie: pas de résultats)
  contextsList = contexts.map((context) => <SmallCard type="information" key={context.id} title={context.title} content={context.content} votes={context.counter_vote} />);
  constraintsList = constraints.map((constraint) => <SmallCard type="information" key={constraint.id} title={constraint.title} content={constraint.content} votes={constraint.counter_vote} />);
  }


  return (
    <div className="flex frow faround">
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
          <i className="btn-round-plus fas fa-2x fa-plus-circle" onClick={() => props.switcher("addContext")}></i>
        </div>
        {contextsList}
      </div>
      <div className="constraints_container flex fcolumn">
        <div className="flex frow fcenter fmiddle mgb-30">
          <h1>Contraintes</h1>
          <i className="btn-round-plus fas fa-2x fa-plus-circle" onClick={() => props.switcher("addConstraint")}></i>
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
Solution.propTypes = {
  findContexts: PropTypes.func.isRequired,
  findConstraints: PropTypes.func.isRequired,
}