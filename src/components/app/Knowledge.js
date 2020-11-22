import React, { Component } from 'react'
import Problematic from '../elements/Problematic'
import Step from '../elements/Step'
import Sidebar from '../layout/sidebar'
import Solution from './Solution'
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
        this.props.findSolutions(data, this.props.history);
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
            case "addContext":
                this.setState({
                    currentView : "addContext"
                })
                break;
            case "addConstraint":
                this.setState({
                    currentView : "addConstraint"
                })
                break;
            default:
                this.setState({
                    currentView : "solutions"
                })
                break;
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.knowledge !== prevProps.knowledge && Array.isArray(this.props.knowledge.solutions)) {
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
            this.setState({
                solutions: solutions,
            })
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
            content = <Solution idKnowledge={id} history={this.props.history}/>;
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
                        {(this.state.currentView === "overview" || this.state.currentView === "addSolution") && 
                        <button type="button" className="btn btn-primary" onClick={() => this.switchView("solutions")}>Solutions</button>
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

/* export default class Knowledge extends Component {

    render() {
        const id = this.props.match.params.knId;
        console.log(id);
        return (
            <div className="full-container">
                <div className="flex-container mgt-50">
                    <Link to="/dashboard"><i class=" btn-round fas fa-3x fa-arrow-circle-left"></i></Link>
                    <Problematic id={id}/>
                    <Step img={imgHead} num="1" code="sudo apt-get install php7.0-mysql" title="Installer l'extension PDO" content="Quick Install Instructions of php-pdo-mysql on Ubuntu Server. It’s Super Easy! simply click on Copy button to copy the command and paste into your command line terminal using built-in APT package manager."/>
                    <Step num="2" title="Récupérer les informations de connexion de sa BDD"
                    code="private $host = 'localhost'; " 
                    content="Il faut trouver les identifiant de connexion à la BDD, son adresse ainsi que son port."/>
                    <Step num="3" title="Créer un composant de connexion"
                    code="public function connect(){ return new PDO }" 
                    content="Il faut trouver les identifiant de connexion à la BDD, son adresse ainsi que son port."/>
                
                </div>
            </div>
        )
    }
} */