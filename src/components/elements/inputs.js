import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export default class Input extends Component {
    render() {
        return (
            <div className="js_input flex fcenter finline">
                <i className={`input-icon fas ${this.props.icon}`}></i>
                <input 
                    type={ this.props.type } 
                    name={ this.props.name } 
                    id={ this.props.name }
                    placeholder={ this.props.placeholder } 
                    value={ this.props.value }
                    onChange={ this.props.onchange }
                    required={ this.props.required }
                />
            </div>
        )
    }
}

export const SimpleInput = props => {
    return (
            <input 
                    type={ props.type } 
                    name={ props.name } 
                    id={ props.name }
                    placeholder={ props.placeholder } 
                    value={ props.value }
                    onChange={ props.onchange }
                    required={ props.required }
                />

    )
}

SimpleInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
}