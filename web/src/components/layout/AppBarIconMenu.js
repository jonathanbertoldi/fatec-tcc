import React, { Component, PropTypes } from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {white} from 'material-ui/styles/colors';

class AppBarIconMenu extends Component {
    render() {
        const { onTouchLogout } = this.props;

        return (
            <IconMenu iconButtonElement={<IconButton><MoreVertIcon color={white}/></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }} >
                <MenuItem primaryText="Sobre" />
                <MenuItem primaryText="Sair" onTouchTap={ onTouchLogout } />
            </IconMenu>
        )
    }
}

AppBarIconMenu.propTypes = {
    onTouchLogout: PropTypes.func.isRequired
}

export default AppBarIconMenu;

