import VMasker from 'vanilla-masker';
import React, { Component, PropTypes } from 'react';
import * as UI from 'material-ui';

class MaskedTextField extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    onChange(mask, e) {
        const value = VMasker.toPattern(e.target.value, mask);
        this.setState({ value });
        if (this.props.onChange)
            this.props.onChange(value, e);
    }

    render() {
        const { mask, ...other } = this.props;
        delete other.defaultValue;
        other.onChange = this.onChange.bind(this, mask);
        other.value = this.state.value;
        return <UI.TextField { ...other } />;
    }
}

MaskedTextField.propTypes = {
    mask: PropTypes.string
};

export default MaskedTextField;