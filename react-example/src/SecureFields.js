import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames/bind'

import SecureField from './SecureField'
import SecureFieldIcon from './SecureFieldIcon'

import './SecureField.css'

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/secure-fields-1.0.0.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-1.0.0.min.js'

const initalInputStyle = 'font-size: 100%; border-radius: 0; -webkit-appearance: none; padding: 0'
const initalCssClass = {
  'secure-field': true,
  'secure-field__input ': true,
  'secure-field__base ': true,
  'secure-field__has-actions ': true,
  'secure-field__has-card-icon': true,
  'secure-field__has-error': false,
  'secure-field__is-recognized': false
}

class SecureFields extends Component {
  constructor() {
    super()
    this.state = {
      message: null,
      cardIcon: 'card-empty',
      cvvIcon: 'cvc-empty',
      cardContainerClassNames: initalCssClass,
      cvvContainerClassNames: initalCssClass
    }
  }

  componentDidMount() {
    const scriptSource = getUrl(this.props.production)

    if (document.querySelector('script[src="' + scriptSource + '"]')) {
      this.initSecureFields()
      return
    }

    const script = document.createElement('script')
    script.src = scriptSource
    script.onload = () => {
      this.initSecureFields()
    }
    document.body.appendChild(script)
  }

  componentWillUnmount() {
    this.secureFields.destroy()
  }

  render() {
    return <form onSubmit={() => this.secureFields.submit()}>
      <div style={{maxWidth: '400px'}}>
        {/* <!-- Card Number markup --> */}
        <SecureField
          fieldType='card'
          label='Card Number'
          customClass={classnames(this.state.cardContainerClassNames)}
          callback={() => this.secureFields.focus('cardNumber')}>
          <SecureFieldIcon fieldType='card' iconType={this.state.cardIcon} />
        </SecureField>
      </div>
      <div style={{maxWidth: '150px', marginTop: '20px'}}>
        {/* <!-- CVV markup --> */}
        <SecureField
          fieldType='cvv'
          label='CVV'
          customClass={classnames(this.state.cvvContainerClassNames)}
          callback={() => this.secureFields.focus('cvv')}>
          <SecureFieldIcon fieldType='cvv' iconType={this.state.cvvIcon} />
        </SecureField>
      </div>
      <div style={{maxWidth: '400px', marginTop: '20px'}}>
        <button type="button" id="form-submit" onClick={() => this.secureFields.submit()}>
          Submit
        </button>
        {this.state.message}
      </div>
    </form>
  }

  initSecureFields = () => {
    const { config } = this.props
    this.secureFields = new window.SecureFields()
    this.secureFields.initTokenize(config.merchantID, config.fields, config.options)
    this.bindSecureFieldsEvents()
  }

  bindSecureFieldsEvents = () => {
    this.secureFields.on('ready', () => {
      // Set styles manually as they're inside an iframe and out of the scope of the parent's stylesheets
      this.secureFields.setStyle('cardNumber', initalInputStyle)
      this.secureFields.setStyle('cvv', initalInputStyle)
      this.secureFields.focus('cardNumber')
    })

    // Set class names and icon when fields change
    this.secureFields.on('change', (data) => {
      let paymentMethod = data.fields.cardNumber.paymentMethod
        ? data.fields.cardNumber.paymentMethod
        : false

      this.setState(prevState => ({
        message: null,
        cardContainerClassNames: {
          ...prevState.cardContainerClassNames,
          'secure-field__is-recognized': !!paymentMethod,
          'secure-field__has-error': false
        },
        cvvContainerClassNames: {
          ...prevState.cvvContainerClassNames,
          'secure-field__has-error': false
        },
        cardIcon: paymentMethod ? ('brands/'+ paymentMethod) : 'card-empty',
        cvvIcon: 'cvc-empty'
      }))
    })

    // Set error icon and class name on validate failure
    this.secureFields.on('validate', (data) => {
      if (!data.fields.cardNumber.valid) {
        this.setState(prevState => ({
          cardContainerClassNames: {
            ...prevState.cardContainerClassNames,
            'secure-field__is-recognized': false,
            'secure-field__has-error': true
          },
          cardIcon: 'card-error'
        }))
      }

      if (!data.fields.cvv.valid) {
        this.setState(prevState => ({
          cvvContainerClassNames: {
            ...prevState.cvvContainerClassNames,
            'secure-field__has-error': true
          },
          cvvIcon: 'cvc-error'
        }))
      }
    })

    // Show transaction ID on success or transaction error message
    this.secureFields.on('success', (data) => {
      let message = null
      if (data.transactionId) {
        message = (
          <pre className={'form-result success'} style={{marginTop: '20px', fontSize: '1rem'}}>
            Data submitted successfully with transaction # {data.transactionId}
          </pre>
        )
      } else if (data.error) {
        message = (
          <pre className={'form-result ' + data.result} style={{marginTop: '20px', fontSize: '1rem'}}>
            {data.error}
          </pre>
        )
      }
      this.setState({message: message})
    })
  }
}

SecureFields.propTypes = {
  production: PropTypes.bool,
  config: PropTypes.object
}

SecureFields.defaultProps = {
  production: false,
  config: {}
}

export default SecureFields
