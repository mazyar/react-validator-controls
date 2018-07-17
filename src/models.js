import validator from 'validator';

/**
 * 
 * @param {*} value, input value
 * check enter a value of the field 
 */
export const required_validation = (value) => {
    if (!value) {
        return required_validation.message || 'Please enter a value of the field name';
    }
}

/**
 * 
 * @param {*} value, input value
 * check value is email or mobile number
 */
export const mobile_email_validation = (value) => {
    if (value && (!validator.isEmail(value) && !validator.isMobilePhone(value, 'fa-IR'))) {
        return mobile_email_validation.message || 'Please enter valid mobile/email value';
    }
}