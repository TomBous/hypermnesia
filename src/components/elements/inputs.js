import React, { Component, forwardRef } from 'react'
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

export const SearchInput = forwardRef((props, ref) => { // Necessite forwardRef pour passer un ref à un child FunctionComponent
    let clearClass
    if (props.value.length > 2) {
        clearClass = 'clear fadein'
    } else {
        clearClass = 'clear'
    }
    return (
            <div className="input-search">
                <input 
                    type="text" 
                    name={ props.name } 
                    id={ props.name }
                    placeholder={ props.placeholder } 
                    value={ props.value }
                    onChange={ props.onchange }
                    ref={ ref }
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="magnifying-glass">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={clearClass} onClick={ props.onClick }>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                </svg>
            </div>
            

    )
})

SimpleInput.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onchange: PropTypes.func.isRequired,
}