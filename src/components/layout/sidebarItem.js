import React, { Component } from 'react'

export default class SidebarItem extends Component {
    render() {
        return (
            <li onClick={this.props.function} className={this.props.active}>
                <h2>{this.props.name}</h2><i className={`fas ${this.props.icon}`} style={{color: this.props.color}}></i>
            </li>
        )
    }
}
