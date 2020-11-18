import React, { Component } from 'react'
import ReactTags from 'react-tag-autocomplete'
import './problematic.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { findTags } from "../../actions/dashboardActions"
import { findKnowledge } from "../../actions/knowledgeActions"

class Problematic extends Component {
    constructor (props) {
        super(props)
    
        this.state = {
          tags: [ ],
          suggestions: [ ]
        }
    
        this.reactTags = React.createRef();
        this.getSuggestions = this.getSuggestions.bind(this);
      }
    
      onDelete (i) {
        const tags = this.state.tags.slice(0)
        tags.splice(i, 1)
        this.setState({ tags })
      }
      getSuggestions() {
        let tagList = this.props.dashboard.tagList;
        function getUnique(arr, comp) {
          // store the comparison  values in array
          const unique =  arr.map(e => e[comp])
          // store the indexes of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
          // eliminate the false indexes & return unique objects
          .filter((e) => arr[e]).map(e => arr[e]);
          return unique;
        }
        this.setState({
          suggestions: getUnique(tagList,'name'),
        })
      }
    
      onAddition (tag) {
        const tags = [].concat(this.state.tags, tag)
        this.setState({ tags })
      }
      componentWillMount() {
        this.props.findKnowledge(this.props.id);
        if (Array.isArray(this.props.dashboard.tagList)) {
          console.log("Current Tag Update and Suggestion");
          this.getSuggestions();
          const currentTags = this.props.dashboard.tagList.filter(tag => tag.id_knowledge == this.props.id);
          this.setState({
            tags: currentTags,
          })
      }
        
      }
      componentDidUpdate(prevProps) {
        if (this.props.dashboard !== prevProps.dashboard && Array.isArray(this.props.dashboard.tagList)) {
            console.log("Current Tag Update and Suggestion");
            this.getSuggestions();
            const currentTags = this.props.dashboard.tagList.filter(tag => tag.id_knowledge == this.props.id);
            this.setState({
              tags: currentTags,
            })
        }
      }
    render() {
      var currentProblematic;
      if (Array.isArray(this.props.dashboard.knowledges)) { // si le user vient de dashboard, on recupère direct le currentProblematic
        const knowledges = this.props.dashboard.knowledges;
        currentProblematic = knowledges.filter(knowledge => knowledge.id == this.props.id)[0]; // premier éléments du tableau filtré
      } 
      if (typeof currentProblematic === 'undefined') { // si non on récupère depuis l'API
        currentProblematic = this.props.knowledge.problematic
      }

        return (
            <div className="problematic">
            <h1>{typeof currentProblematic !== 'undefined' && currentProblematic.problematic}</h1>
            <ReactTags
                ref={this.reactTags}
                tags={this.state.tags}
                suggestions={this.state.suggestions}
                onDelete={this.onDelete.bind(this)}
                onAddition={this.onAddition.bind(this)}
                allowNew={true}
                placeholderText="Mots clefs des contextes"
            />
                
            </div>
        )
    }
}
Problematic.propTypes = {
    findTags: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    dashboard: state.dashboard,
    knowledge: state.knowledge
})
export default connect(mapStateToProps, {findTags, findKnowledge})(Problematic);
