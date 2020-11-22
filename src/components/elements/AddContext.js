import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import './AddContext.css';
import '../app/Onboarding.css';
import contextTips from '../../images/website/context-tips.svg'
import questionningMan from '../../images/website/man-questionning.svg'
import { SimpleInput } from './inputs'
import { addContext } from '../../actions/contextsActions'

export default function AddContext(props) {
    const user = useSelector(state => state.security.user.result);
    //const idKnowledge = props.match.params.knId;
    const [context, setContext] = useState({
        title:"",
        content:""
    });
    const dispatch = useDispatch();

    const handleContextChange = (e) => {
        if (e.target.name === "context_title") {
            setContext({...context, title: e.target.value}) 
        } else if ((e.target.name === "context")) {
            setContext({...context, content: e.target.value})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          title: context.title,
          content: context.content,
          idUser: user.id,
          idKnowledge: props.idKnowledge
        }
        dispatch(addContext(data));
        props.close("");
    }

    return (
        <div className="full-popup">
        <div className="onboarding_container flex frow fcenter">
            <img src={contextTips} className="big_drawing slide-right" width="260" alt="" />
            <div className="onboarding_content flex fcolumn fmiddle">
                <h1>Ajouter un contexte ?</h1>
                <p>(Si votre contexte nécessite une solution complètement différente, créer une nouvelle problématique)</p>
                <SimpleInput type="text" name="context_title" placeholder="Titre de l'élément de contexte" value={context.title} onchange={handleContextChange}/>
                <textarea name="context" id="context" placeholder="Détails du contexte" value={context.content} onChange={handleContextChange}></textarea>
                <div className="flex frow fbetween">
                    <button className="btn btn-danger" onClick={() => props.close("")}>Annuler</button>
                    <button className="btn btn-success" onClick={(e) => handleSubmit(e)}>Ajouter</button>
                </div>
            </div>
            <img src={questionningMan} className="little_drawing slide-left" width="120" alt="" />
        </div>
            
        </div>
    )
}
