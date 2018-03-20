/**
 * Created by Mark Aquino on 1/3/17.
 */
import React from 'react';

const STATUS = {
    NROMAL: 'normal',
    HOVERED: 'hovered',
};

export default class Link extends React.Component {
    constructor(props) {
        super(props);

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);

        this.state = {
            class: STATUS.NORMAL,
        };
    }

    _onMouseEnter() {
        this.setState({class: STATUS.HOVERED});
    }

    _onMouseLeave() {
        this.setState({class: STATUS.NROMAL});
    }

    render() {
        return (
            <a
                className={this.state.class}
                href={this.props.page || 'e'}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}>
                {this.props.children}
            </a>
        )
    };
}