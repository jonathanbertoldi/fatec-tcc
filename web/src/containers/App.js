import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as authActions from '../actions/authActions';

import Login from '../components/login/Login';
import Layout from '../components/layout/Layout';

class App extends Component {
    render() {
        const { auth } = this.props;

        return (
            <MuiThemeProvider>
                { auth.isAuthenticated ? <Layout {...this.props} >{ this.props.children }</Layout> : <Login {...this.props} /> }
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    const { auth } = state;

    return {
        auth
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(authActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);