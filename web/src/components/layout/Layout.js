import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';

import PhotoCameraIcon from 'material-ui/svg-icons/image/add-a-photo';
import Home from 'material-ui/svg-icons/action/home';
import Social from 'material-ui/svg-icons/social/share';

import AppBarIconMenu from './AppBarIconMenu';

let mediaQueryChangedHandler;

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            drawerDocked: false
        }
    }

    componentWillMount() {
        const mql = window.matchMedia(`(min-width: 1000px)`);
        mediaQueryChangedHandler = this.mediaQueryChanged.bind(this);
        mql.addListener(mediaQueryChangedHandler);
        this.setState({ mql: mql, drawerOpen: mql.matches, drawerDocked: mql.matches});
    }

    componentWillUnmount() {
        this.state.mql.removeListener(mediaQueryChangedHandler);
    }

    mediaQueryChanged() {
        this.setState({ drawerOpen: this.state.mql.matches });
        this.setState({ drawerDocked: this.state.mql.matches });
    }

    toggleDrawer() {
        if (!this.state.mql.matches)
            this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    render() {
        const { logoutAdmin } = this.props;

        return (
            <div>
                <AppBar title="Tully"
                    onLeftIconButtonTouchTap={ this.toggleDrawer.bind(this) }
                    iconElementRight={ <AppBarIconMenu onTouchLogout={ logoutAdmin } /> } /> 
            
                <Drawer docked={this.state.drawerDocked}
                    open={this.state.drawerOpen}
                    onRequestChange={this.toggleDrawer.bind(this)} >

                    <AppBar title="Tully"
                        style={ { backgroundColor: "#FFF" } }
                        titleStyle={{ color: "#6F797E" }} 
                        iconElementLeft={ <IconButton><PhotoCameraIcon color={"#6F797E"} /></IconButton> } />

                    <Menu>
                        <MenuItem onTouchTap={ this.toggleDrawer.bind(this) }
                             leftIcon={<Home />} >Home</MenuItem>
                        <MenuItem onTouchTap={ this.toggleDrawer.bind(this) } 
                             leftIcon={<Social />}>Usuários</MenuItem>
                        <MenuItem onTouchTap={ this.toggleDrawer.bind(this) } >Desafios</MenuItem>
                        <MenuItem onTouchTap={ this.toggleDrawer.bind(this) } >Administradores</MenuItem>
                    </Menu>

                </Drawer>

            </div>
            
        )
    }
}

export default Layout;