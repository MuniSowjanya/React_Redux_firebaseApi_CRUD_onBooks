import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Nav.css'

class Nav extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        this.props.notifyPathname(window.location.pathname);
    }

    render() {
        return (
            <div>
                {
                    window.location.pathname === '/' ?
                    <Link to="/create" className="btn btn-primary btn-add">Add New</Link>: ''
                }
            </div>
        )
    }
}

export default Nav;