import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ValidateInput from './input.validate';

/**
 * Validation form 
 * this control similar to provider fr validation form
 */
export default class ValidateForm extends Component {

    /**
     * validation control list
     */
    validation_control_list = [];

    /**
     * for register validation control
     */
    static childContextTypes = {
        register_control: PropTypes.func.isRequired
    }

    /**
     * create global register context
     */
    getChildContext() {
        return {
            register_control: this._register.bind(this)
        }
    }

    /**
     * register control function
     */
    _register(validation_control) {

        /**
         * register validation control
         */
        if (validation_control instanceof ValidateInput) {
            this.validation_control_list.push(validation_control);
        }
    }

    /**
     * check childe is has valid value
     */
    check_valid_children = () => { 
        /**
         *  Find any control that is not valid in validation list
         */       
        return !_.find(this.validation_control_list, v => { return v.is_valid() === false });
    }

    /**
     * Sumbit function
     */
    on_submit = (event) => {

        event.preventDefault();

        const is_valid = this.check_valid_children();        
        if (_.isFunction(this.props.onSubmit)) {
            this.props.onSubmit(event, is_valid);
        }
    }

    /**
     * render commponents
     */
    render() {
        return <React.Fragment>
            <form {...this.props} onSubmit={this.on_submit.bind(this)}>
                {this.props.children}
            </form>
        </React.Fragment>
    }
}