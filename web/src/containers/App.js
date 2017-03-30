import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Login from '../components/Login';

import * as authActions from '../actions/authActions';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Login {...this.props} />
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    var { auth } = state;

    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);