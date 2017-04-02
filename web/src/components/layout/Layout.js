import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import IconButton from 'material-ui/IconButton';

import PhotoCameraIcon from 'material-ui/svg-icons/image/add-a-photo';
import Home from 'material-ui/svg-icons/action/home';
import People from 'material-ui/svg-icons/social/people';
import Explore from 'material-ui/svg-icons/action/explore';
import Security from 'material-ui/svg-icons/hardware/security';

import AppBarIconMenu from './AppBarIconMenu';

let mediaQueryChangedHandler;

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen  : false,
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
        this.setState({ drawerOpen  : this.state.mql.matches });
        this.setState({ drawerDocked: this.state.mql.matches });
    }

    toggleDrawer() {
        if (!this.state.mql.matches)
            this.setState({ drawerOpen: !this.state.drawerOpen });
    }

    render() {
        const { drawerDocked, drawerOpen } = this.state;
        const { logoutAdmin }              = this.props;

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
                    
                    <List>

                        <ListItem onTouchTap={ this.toggleDrawer.bind(this) }
                            leftIcon={<Home />}
                            containerElement={<Link to="/" />} >Home</ListItem>
                        <ListItem onTouchTap={ this.toggleDrawer.bind(this) } 
                            leftIcon={<People />}
                            containerElement={<Link to="/users" />} >Usuários</ListItem>
                        <ListItem onTouchTap={ this.toggleDrawer.bind(this) }
                            leftIcon={<Explore />}
                            containerElement={<Link to="/challenges" />} >Desafios</ListItem>
                        <ListItem onTouchTap={ this.toggleDrawer.bind(this) }
                            leftIcon={<Security />}
                            containerElement={<Link to="/admins" />} >Administradores</ListItem>
                            
                    </List>

                    <Divider />

                    <Subheader>Tully &copy;</Subheader>
                </Drawer>
                <div style={ drawerDocked && drawerOpen ? { paddingLeft: "260px" } : { paddingLeft: "0px" } }>
                    { this.props.children }
                </div>
            </div>
            
        )
    }
}

export default Layout;