import validator from 'validator'

/**
 *
 * @param {*} value, input value
 * check enter a value of the field
 */
export const required_validation = (value) => {
  if (!value) {
    const message = required_validation.message || 'Please enter a value of the field name'
    return {
      message,
      type: 'required'
    }
  }
}

/**
 *
 * @param {*} value, input value
 * check value is email or mobile number
 */
export const mobile_email_validation = (value) => {
  if (value && (!validator.isEmail(value) && !validator.isMobilePhone(value, 'fa-IR'))) {
    const message = mobile_email_validation.message || 'Please enter valid mobile/email value'
    return {
      message,
      type: 'mobile_email'
    }
  }
}

/**
 *
 * @param {*} value, input value
 * check value is valid mobile number
 */
export const mobile_validation = (value) => {
  if (value && !validator.isMobilePhone(value, 'fa-IR')) {
    const message = mobile_validation.message || 'Please enter valid mobile value'
    return {
      message,
      type: 'mobile'
    }
  }
}
