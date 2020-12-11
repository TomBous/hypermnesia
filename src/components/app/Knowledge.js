import React, { Component } from 'react'
import Problematic from '../elements/Problematic'
import Step from '../elements/Step'
import Sidebar from '../layout/sidebar'
import AddSolution from './AddSolution'
import Overview from './Overview'
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { findSolutions } from "../../actions/solutionsActions"
import { PropTypes } from "prop-types";
import imgHead from '../../images/website/software-engineering.jpg'

class Knowledge extends Component {
    constructor (props) {
        super(props)
        this.state = {
            solutions: "",
            currentSolution: 0,
            currentView: "solutions",
        }
        this.switchSolution = this.switchSolution.bind(this);
        this.switchView = this.switchView.bind(this);
        this.selectSolution = this.selectSolution.bind(this);
      }
    componentWillMount() {
        const data = {
            'idKnowledge': this.props.match.params.knId,
        };
        this.props.findSolutions(data);
    }
    switchSolution() {
        const nbSolution = this.state.solutions.length - 1;
        if (this.state.currentSolution < nbSolution) {
            this.setState((prevState) => ({
                currentSolution: prevState.currentSolution + 1, 
            }))
        } else {
            this.setState({
                currentSolution: 0,
            })
        }
    }
    selectSolution(number) {
        this.setState({
            currentSolution: number,
        })
    }
    switchView(view) {
        //this.props.history.push(this.props.location.pathname + "/add-solution")
        switch (view) {
            case "solutions":
                this.setState({
                    currentView : "solutions"
                })
                break;
            case "overview":
                this.setState({
                    currentView : "overview"
                })
                break;
            case "addSolution":
                this.setState({
                    currentView : "addSolution"
                })
                break;
            default:
                this.setState({
                    currentView : "solutions"
                })
                break;
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (Array.isArray(this.props.knowledge.solutions) && this.props.knowledge.solutions !== prevProps.knowledge.solutions) {
            let randomSolutions = this.props.knowledge.solutions;
            var solutions = [];
            // A partir des steps, création d'un tableau de solutions
            let lastId = 0;
            let counter = -1; // Pour avoir le 0 dans le tableau counter++
            randomSolutions.forEach(step => {
                if (step.id_solution === lastId) {
                    solutions[counter].push(step);
                } else {
                    lastId = step.id_solution;
                    counter++;
                    solutions[counter] = [step];
                }
            })
            // Pour chaque solution je met dans l'ordre les steps
            function orderByPosition( a, b ) {
                if ( a.position < b.position ){
                  return -1;
                }
                if ( a.position > b.position ){
                  return 1;
                }
                return 0;
            }
            solutions.forEach(solution => solution.sort(orderByPosition));
            console.log("SET STATE !!!")
            this.setState({
                solutions: solutions,
            })
        }
        // Gestion du Copy Paste des blocs de code
        if (this.state.solutions !== prevState.solutions || this.state.currentSolution !== prevState.currentSolution) {
            const codeBlocks = document.querySelectorAll(".code-content");
            if (codeBlocks.length > 0) {
                const codeTexts = []
                codeBlocks.forEach((bloc) => {
                    let text = []
                    bloc.childNodes.forEach((span) => {
                        if (span.tagName === "SPAN") {
                            text.push(span.innerText)
                        }
                    })
                    codeTexts.push(text.join(''))
                })
                const copyButtons = document.querySelectorAll(".copyIcon")
                copyButtons.forEach((button, index) => {
                    button.addEventListener("click", () => {
                        copyTextToClipboard(codeTexts[index])
                    })
                })
            }
        }
    }

    render() {
        const id = this.props.match.params.knId;
        console.log(id);
        let content = [];
        if (this.state.currentView === "solutions"  && Array.isArray(this.state.solutions)) {
            let solutions = this.state.solutions;
            content = (
                <div className="flex-container">
                {solutions[this.state.currentSolution].map(step => <Step /*img={imgHead}*/ key={step.id} num={step.position} title={step.title} content={step.content}/>)}
                </div>
            )
        } else if (this.state.currentView === "overview") {
            content = <Overview idKnowledge={id} solutions={this.state.solutions} history={this.props.history} switcher={this.switchView} solViewer={this.selectSolution}/>;
        } else if (this.state.currentView === "addSolution") {
            content = <AddSolution idKnowledge={id} switchView={this.switchView} selectSolution={this.selectSolution} history={this.props.history}/>;
        } else {
            content = <div className="no_result"><h1>Aucune solution</h1></div>
        }
        return (
            <div className="full-container">
            <Sidebar />
                <div className="flex-container mgt-50">
                    <div className="flex frow fbetween fstart">
                        <i className="btn-round fas fa-3x fa-arrow-circle-left" onClick={() => this.props.history.goBack()}></i>
                        {this.state.currentView === "solutions" && this.state.solutions.length > 1 &&
                        <button type="button" className="btn btn-success" onClick={this.switchSolution}>Autre solution</button>
                        }
                        {this.state.currentView === "solutions" && 
                        <button type="button" className="btn btn-primary" onClick={() => this.switchView("overview")}>En savoir plus</button>
                        }
                        {(this.state.currentView === "overview") && 
                        <button type="button" className="btn btn-primary" onClick={() => this.switchView("solutions")}>Solutions</button>
                        }
                        {(this.state.currentView === "addSolution") && 
                        <button type="button" className="btn btn-primary" onClick={() => this.switchView("overview")}>Vue d'ensemble</button>
                        }
                        
                    </div>
                    <Problematic id={id}/>
                </div>
                {content}
            </div>
        )
    }
}
Knowledge.propTypes = {
    findSolutions: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
        knowledge: state.knowledge
    };
  }
export default connect(mapStateToProps, { findSolutions })(Knowledge);

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        console.log("Update your browser to copy to clipboard");
      return;
    }
    navigator.clipboard.writeText(text).then(
      function() {
        console.log("Async: Copying to clipboard was successful!");
      },
      function(err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }
