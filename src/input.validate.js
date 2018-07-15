import React, { Component } from 'react';
import _ from 'lodash';
import validator from 'validator';
import PropTypes from 'prop-types';
import * as validate from './constant';

/**
 *  Validate Input Component
 */
export default class ValidateInput extends Component {

    /**
     * Error list
     */
    error_list = [];

    static contextTypes = {
        register_control: PropTypes.func.isRequired
    }

    componentDidMount() {

        /**
         * register validation control
         */
        const { register_control } = this.context;

        if (register_control) {
            register_control(this);
        } else {
            throw new Error('Register control function in undefined');
        }
    }

    /**
     * check value is valid
     */
    is_valid() {

        const { valiadate_list, value } = this.props;

        /**
         * Empty error lost before check
         */
        this.error_list = [];

        _.forEach(valiadate_list, val => {
            switch (val.type) {

                /**
                * Required Validate
                */
                case validate.REQUIRED:

                    if (!value) {
                        this.error_list.push(val);
                    }

                    break;

                /**
                 * Mobile Validate
                 */
                case validate.MOBILE:

                    if (value && !validator.isMobilePhone(value, 'fa-IR')) {
                        this.error_list.push(val);
                    }

                    break;

                /**
                 * Mobile Or Email, value at least is email or mobile
                 */
                case validate.MOBILE_EMAIL:

                    if (value && (!validator.isEmail(value) && !validator.isMobilePhone(value, 'fa-IR'))) {
                        this.error_list.push(val);
                    }

                    break;

                default:
                    break;
            }
        });

        return this.error_list.length === 0;
    }

    render() {

        /**
         * validate_list : list of type validate for check
         * is_form : when form has been subit this value set to "True"
         */
        const { is_form } = this.props;

        /**
         * validate fail for show error message
         */
        this.error_list = [];
        if (is_form === true) {
            this.is_valid();
        }

        return <React.Fragment>
            {this.props.children}
            {_.map(this.error_list, (value, index) => (
                <span key={'err' + index} className='error-view'>{value.message}</span>
            ))}
        </React.Fragment>
    }
}
