import React, { useState, Fragment, useEffect } from 'react'
import { SimpleInput } from '../elements/inputs'
import { useSelector, useDispatch, connect } from "react-redux"
import { Link } from "react-router-dom";
import { addKnowledge } from "../../actions/knowledgeActions"
import { PropTypes } from "prop-types";
import './Onboarding.css'
// Images
import lookingMan from '../../images/website/man-searching.svg'
import target from '../../images/website/cible-inversee.svg'
import questionningMan from '../../images/website/man-questionning.svg'
import contextTips from '../../images/website/context-tips.svg'
import cage from '../../images/website/cage.svg'
import lackMoney from '../../images/website/lack-money.svg'

const Onboarding = (props) => {
    const user = useSelector(state => state.security.user.result);
    // const idKnowledge = props.match.params.knId;
    var idPerspective = useSelector(state => state.dashboard.perspective);
    
    const [slide, setSlide] = useState(1);
    const [knowledge, setKnowledge] = useState({
        idUser: user.id,
        idPerspective: "",

    });
    const [context, setContext] = useState({
        idUser: user.id,
    });
    const [constraint, setConstraint] = useState({
        idUser: user.id,
    });
    useEffect(() => { // Necessaire pour forcer le useSelector Perspective à run de nouveau vu que sa valeur n'est pas appeler dans le render
        setKnowledge({ ...knowledge, idPerspective: idPerspective })
    }, [idPerspective]) 

    const handleInputChange = (e) => {
        setKnowledge({...knowledge, problematic: e.target.value})
    }
    const handleContextChange = (e) => {
        console.log(e.target)
        if (e.target.name === "context_title") {
            setContext({...context, title: e.target.value}) 
        } else if ((e.target.name === "context")) {
            setContext({...context, content: e.target.value})
        }
    }
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
          knowledge: knowledge,
          context: context,
          constraint: constraint
        }
        console.log("Data : ", data);
        console.log("Function : ", addKnowledge);
        props.addKnowledge(data, props.history);
    }
    const nextSlide = () => {
        setSlide(slide + 1);
    }
    const prevSlide = () => {
        setSlide(slide - 1);
    }
    return (
        <div className="full-container flex fcolumn fcenter fmiddle">
            <div className="onboarding_container flex frow fend">
                <Link to="/dashboard"><i class="far fa-2x fa-times-circle close-icon"></i></Link>
            </div>
            <div className="onboarding_container flex frow fcenter">
                    { slide === 1 && (
                    <Fragment>
                        <img src={lookingMan} className="big_drawing slide-right" width="200" alt="" />
                        <div className="onboarding_content flex fcolumn fmiddle">
                            <h1>Quel est votre problématique ?</h1>
                            <SimpleInput type="text" name="problematic" placeholder="Nouvelle problématique" value={knowledge.problematic} onchange={handleInputChange} />
                            <button className="btn btn-primary" onClick={nextSlide}>Ajouter</button>
                        </div>
                        <img src={target} className="little_drawing slide-left" width="120" alt="" />
                    </Fragment>
                    )}
                    { slide === 2 && (
                    <Fragment>
                        <img src={contextTips} className="big_drawing slide-right" width="260" alt="" />
                        <div className="onboarding_content flex fcolumn fmiddle">
                            <h1>Dans quel contexte ?</h1>
                            <SimpleInput type="text" name="context_title" placeholder="Titre de l'élément de contexte" value={context.title} onchange={handleContextChange}/>
                            <textarea name="context" id="context" placeholder="Détails du contexte" value={context.content} onChange={handleContextChange}></textarea>
                            <div className="flex frow fbetween">
                                <button className="btn btn-primary" onClick={prevSlide}>Précédent</button>
                                <button className="btn btn-success" onClick={nextSlide}>Suivant</button>
                            </div>
                        </div>
                        <img src={questionningMan} className="little_drawing slide-left" width="120" alt="" />
                    </Fragment>
                    )}
                    { slide === 3 && (
                    <Fragment>
                        <img src={cage} className="big_drawing slide-right" width="200" alt="homme en cage" />
                        <div className="onboarding_content flex fcolumn fmiddle">
                            <h1>Avez-vous des contraintes ?</h1>
                            <SimpleInput type="text" name="constraint_title" placeholder="Titre de la contrainte" value={constraint.title} onchange={handleConstraintChange} />
                            <textarea name="constraint" id="constraint" placeholder="Détails de la contrainte" value={constraint.content} onChange={handleConstraintChange}></textarea>
                            <div className="flex frow fbetween">
                                <button className="btn btn-primary" onClick={prevSlide}>Précédent</button>
                                <button className="btn btn-success" onClick={nextSlide}>Suivant</button>
                            </div>
                        </div>
                        <img src={lackMoney} className="little_drawing slide-left" width="120" alt="" />
                    </Fragment>
                    )}
                    { slide === 4 && (
                    <Fragment>
                        <img src={cage} className="big_drawing slide-right" width="200" alt="homme en cage" />
                        <div className="onboarding_content flex fcolumn fmiddle">
                            <h1>Avez-vous une solution ?</h1>
                            <div className="flex frow fbetween">
                                <button className="btn btn-primary" onClick={prevSlide}>Proposer une solution</button>
                                <button className="btn btn-success" onClick={handleSubmit}>Pas maintenant</button>
                            </div>
                        </div>
                        <img src={lackMoney} className="little_drawing slide-left" width="120" alt="" />
                    </Fragment>
                    )}
            </div>
        </div>
    )
}
Onboarding.propTypes = {
    addKnowledge: PropTypes.func.isRequired,
  }
  function mapStateToProps(state) {
    return {
      security: state.security,
    };
  }
export default connect(mapStateToProps, { addKnowledge })(Onboarding);