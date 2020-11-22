import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import './AddConstraint.css';
import '../app/Onboarding.css';

import cage from '../../images/website/cage.svg'
import lackMoney from '../../images/website/lack-money.svg'

import { SimpleInput } from './inputs'
import { addConstraint } from '../../actions/constraintActions'

export default function AddConstraint(props) {
    const user = useSelector(state => state.security.user.result);
    //const idKnowledge = props.match.params.knId;
    const [constraint, setConstraint] = useState({
        title:"",
        content:""
    });
    const dispatch = useDispatch();

    const handleConstraintChange = (e) => {
        if (e.target.name === "constraint_title") {
            setConstraint({...constraint, title: e.target.value}) 
        } else if ((e.target.name === "constraint")) {
            setConstraint({...constraint, content: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          title: constraint.title,
          content: constraint.content,
          idUser: user.id,
          idKnowledge: props.idKnowledge
        }
        dispatch(addConstraint(data));
        props.close("");
    }

    return (
        <div className="full-popup">
            <div className="onboarding_container flex frow fcenter">
                <img src={cage} className="big_drawing slide-right" width="200" alt="homme en cage" />
                <div className="onboarding_content flex fcolumn fmiddle">
                    <h1>Avez-vous des contraintes ?</h1>
                    <SimpleInput type="text" name="constraint_title" placeholder="Titre de la contrainte" value={constraint.title} onchange={handleConstraintChange} />
                    <textarea name="constraint" id="constraint" placeholder="Détails de la contrainte" value={constraint.content} onChange={handleConstraintChange}></textarea>
                    <div className="flex frow fbetween">
                        <button className="btn btn-danger" onClick={() => props.close("")}>Annuler</button>
                        <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>Ajouter</button>
                    </div>
                </div>
                <img src={lackMoney} className="little_drawing slide-left" width="120" alt="" />
            </div>
            
        </div>
    )
}
