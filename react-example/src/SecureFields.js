import React, { Component } from 'react'
import classnames from 'classnames/bind'
import SecureField from './SecureField'
import SecureFieldIcon from './SecureFieldIcon'

import './SecureField.css'

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

const config = {
  merchantID: '1100007006',
  fields:{
    cardNumber: {
      placeholderElementId: 'card-number',
      inputType: 'tel'
    },
    cvv: {
      placeholderElementId: 'cvv-number',
      inputType: 'tel'
    }
  },
  options: {}
}

class SecureFields extends Component {
  constructor() {
    super()
    this.state = {
      message: null,
      cardIcon: 'card-empty',
      cvvIcon: 'card-empty',
      cardContainerClassNames: initalCssClass,
      cvvContainerClassNames: initalCssClass
    }

    this.secureFields = new window.SecureFields()
  }

  componentDidMount() {
    this.secureFields.initTokenize(config.merchantID, config.fields, config.options)

    this.secureFields.on('ready', () => {
      // Set styles manually as they're inside an iframe and out of the scope of the parent's stylesheets
      this.secureFields.setStyle('cardNumber', initalInputStyle)
      this.secureFields.setStyle('cvv', initalInputStyle)
      this.secureFields.focus('cardNumber')
    })

    // Set class names when fields change
    this.secureFields.on('change', (data) => {
      let paymentMethod = data.fields.cardNumber.paymentMethod ? data.fields.cardNumber.paymentMethod : false
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
        cvvIcon: 'card-empty'
      }))
    })

    // Set class names on validate
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
          cvvIcon: 'card-error'
        }))
      }
    })

    this.secureFields.on('success', (data) => {
      let message = ''
      if (data.transactionId) {
        message = (<pre className={'form-result success'} style={{marginTop: '20px', fontSize: '1rem'}}>Data submitted successfully with transaction # {data.transactionId}</pre>)
      } else {
        message = (<pre className={'form-result ' + data.result} style={{marginTop: '20px', fontSize: '1rem'}}>{data.error}</pre>)
      }
      this.setState({message: message})
    })
  }

  componentWillUnmount() {
    this.secureFields.destroy()
  }

  render() {
    return <form onSubmit={() => this.secureFields.submit()}>
      <div style={{maxWidth: '400px'}}>
        {/* <!-- Card Number markup --> */}
        <SecureField fieldType='card' label='Card Number' customClass={classnames(this.state.cardContainerClassNames)} callback={() => this.secureFields.focus('cardNumber')}>
          <SecureFieldIcon fieldType='card' iconType={this.state.cardIcon} />
        </SecureField>
      </div>
      <div style={{maxWidth: '150px', marginTop: '20px'}}>
        {/* <!-- CVV markup --> */}
        <SecureField fieldType='cvv' label='CVV' customClass={classnames(this.state.cvvContainerClassNames)} callback={() => this.secureFields.focus('cvv')}>
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
}

export default SecureFields
