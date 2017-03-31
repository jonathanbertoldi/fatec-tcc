import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import AppBarIconMenu from './AppBarIconMenu';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <AppBar title="Tully"
                iconElementRight={ <AppBarIconMenu /> } /> 
        )
    }
}

export default Layout;