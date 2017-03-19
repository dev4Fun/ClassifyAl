import React, { Component } from 'react';

export default class Link extends Component {

    constructor(props) {
        super(props);
        this.state = { hovered: false }
    }

    toggleHover = () => {
        this.setState({ hovered: !this.state.hovered })
    }

    render() {
        let linkStyle;

        if (this.state.hovered) {
            linkStyle = { color: '#FFF', textDecoration: 'none' }
        } else {
            linkStyle = { color: 'rgb(45,45,45)', fontWeight: '300' }
        }

        return (
            <a style={linkStyle} onMouseEnter={this.toggleHover}
                onMouseLeave={this.toggleHover} href={this.props.href}>
                {this.props.children}
            </a>
        )
    }
}