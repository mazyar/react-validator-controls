import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


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

    /**
     * validates , list for validate function
     * value, control value
     * error_message,errorMessage, error message
     */
    const {
      validates,
      value,
      errorMessages,
      errorMessage,
      error_message } = this.props;

    /**
     * Empty error list before check
     */
    this.error_list = [];

    /**
     * check validation
     */
    _.forEach(validates, func => {
      if (_.functions(func)) {
        const message = func(value);
        if (message) {

          /**
           * get error messaeg
           */
          let error_mgs = '';

          /// gets errors message from error messages list
          if (errorMessages && message.type && errorMessages[message.type]) {
            error_mgs = errorMessages[message.type];
          } else {
            error_mgs = errorMessage || error_message || message.message;
          }

          this.error_list.push(error_mgs);
        }
      }
    });

    return this.error_list.length === 0;
  }

  render() {

    /**
     * is_form : when form has been subit this value set to "True"
     * isForm: exist in 0.0.3 version similiar to is_form (new )
     */
    const { is_form, isForm } = this.props;

    /**
     * validate fail for show error message
     */
    this.error_list = [];
    if (is_form === true || isForm === true) {
      this.is_valid();
    }

    return <React.Fragment>
      {this.props.children}
      {_.map(this.error_list, (value, index) => (
        <span key={'err' + index} className='error-view'>{value}</span>
      ))}
    </React.Fragment>
  }
}
