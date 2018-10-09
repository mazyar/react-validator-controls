# react-validator-controls

> react validation controls

[![NPM](https://img.shields.io/npm/v/react-validator-controls.svg)](https://www.npmjs.com/package/react-validator-controls) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-validator-controls
```

## Usage

```jsx
import React, { Component } from 'react'

import { InputValidate, ValidateForm } from 'react-validator-controls';
import { Models } from 'react-validator-controls';
import validator from 'validator';

/**
 * Url validation
 */
const url_validation = (value) => {
    if (value && !validator.isURL(value)) {
        return  { message:'Enter valid url' , type:'url'  } ;
    }
}

const error_message_list = {
    required:'enter any valid',
    url: 'enter valid url'
}

class Example extends Component {


  handle_change = (e) => this.setState({ [e.target.name]: e.target.value });

  handle_submit = (event, is_valid) => {

    event.preventDefault();
    const { username, password } = this.state;
    
     /**
         * set show loading and set form mode, is_form = true
     */
     this.setState({ loading: true, is_form: true });

     if (is_valid === true) {
        ... your code
     }

  }

  render () {
    return (
     <ValidateForm
        onSubmit={this.handle_submit.bind(this)}
        className="forms" id="forms-login" noValidate>
         <div>
            <InputValidate
                  validates={[ Models.required_validation, Models.mobile_email_validation]}
                  iForm={this.state.is_form}
                  value={this.state.username}>
                      <input className="form-control login-frm-input"
                                          type="text" id="username" name="username"
                                          onChange={this.handle_change}
                                          placeholder="mobile / Email" />
            </InputValidate>
         </div>

         <div>
            <InputValidate
                   validates={[Models.required_validation]}
                   errorMessage='Please enter your password'
                   isForm={this.state.is_form}
                   value={this.state.password}>
                      <input onChange={this.handle_change}
                             type="password" id="password" name="password"
                             placeholder="Password" />
            </InputValidate>
         </div>

          <div>
            <InputValidate
                   validates={[Models.required_validation,url_validation]}
                   isForm={this.state.is_form}
                   value={this.state.password}>
                      <input onChange={this.handle_change}
                             type="text" id="url" name="url"
                             placeholder="url" />
            </InputValidate>
         </div>

          <div>
            <InputValidate
                   validates={[Models.required_validation,url_validation]}
                   isForm={this.state.is_form}
                   errorMessages={error_message_list}
                   value={this.state.password}>
                      <input onChange={this.handle_change}
                             type="text" id="url" name="url"
                             placeholder="url" />
            </InputValidate>
         </div>

     </ValidateForm>
    )
  }
}
```

## License

MIT © [](https://github.com/)
