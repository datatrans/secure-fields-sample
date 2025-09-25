import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

import SecureField from './SecureField'
import SecureFieldIcon from './SecureFieldIcon'

import './SecureField.css'

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'

const initalInputStyle = 'font-size: 100%; border-radius: 0; -webkit-appearance: none; padding: 0; outline: none'
const initalCssClass = {
  'secure-field': true,
  'secure-field__input ': true,
  'secure-field__base ': true,
  'secure-field__has-actions ': true,
  'secure-field__has-card-icon': true,
  'secure-field__has-error': false,
  'secure-field__is-recognized': false
}

export default function SecureFields({ production, config }) {
  const [secureFields, setSecureFields] = useState()
  const [message, setMessage] = useState()
  const [cardIcon, setCardIcon] = useState('card-empty')
  const [cvvIcon, setCvvIcon] = useState('cvv-empty')
  const [cardContainerClassNames, setCardContainerClassNames] = useState(initalCssClass)
  const [cvvContainerClassNames, setCvvContainerClassNames] = useState(initalCssClass)

  const initSecureFields = () => {
    const initalizedSecureFields = new window.SecureFields()
    initalizedSecureFields.initTokenize(config.merchantID, config.fields, config.options)
    setSecureFields(initalizedSecureFields)
  }

  const cleanupSecureFields = () => {
    if (secureFields) {
      window.setTimeout(() => {
        try {
          secureFields.destroy()
          setSecureFields(null)
        } catch (err) {
          alert('Unmount error', err)
        } // eslint-disable-line no-empty
      }, 1)
    }
  }

  useEffect(() => {
    const scriptSource = getUrl(production)

    if (!secureFields) {
      if (document.querySelector('script[src="' + scriptSource + '"]')) {
        initSecureFields()

        return cleanupSecureFields
      }

      const script = document.createElement('script')
      script.src = scriptSource
      script.onload = () => {
        initSecureFields()
      }

      document.body.appendChild(script)

      return cleanupSecureFields
    }
  }, [])

  useEffect(() => {
    if (secureFields) {
      secureFields.on('ready', () => {
      // Set styles manually as they're inside an iframe and out of the scope of the parent's stylesheets
        secureFields.setStyle('cardNumber', initalInputStyle)
        secureFields.setStyle('cvv', initalInputStyle)
        secureFields.focus('cardNumber')
      })

      // Set class names and icon when fields change
      secureFields.on('change', (data) => {
        let paymentMethod = data.fields.cardNumber.paymentMethod
          ? data.fields.cardNumber.paymentMethod
          : false

        setMessage(null)
        setCardContainerClassNames({
          ...cardContainerClassNames,
          'secure-field__is-recognized': !!paymentMethod,
          'secure-field__has-error': false
        })
        setCvvContainerClassNames({
          ...cvvContainerClassNames,
          'secure-field__has-error': false
        })
        setCardIcon(paymentMethod ? ('brands/'+ paymentMethod) : 'card-empty')
        setCvvIcon('cvc-empty')
      })

      // Set error icon and class name on validate failure
      secureFields.on('validate', (data) => {
        if (!data.fields.cardNumber.valid) {
          setCardContainerClassNames({
            ...cardContainerClassNames,
            'secure-field__is-recognized': false,
            'secure-field__has-error': true
          })
          setCardIcon('card-error')
        }

        if (!data.fields.cvv.valid) {
          setCvvContainerClassNames({
            ...cvvContainerClassNames,
            'secure-field__has-error': true
          })
          setCvvIcon('cvc-error')
        }
      })

      // Show transaction ID on success or transaction error message
      secureFields.on('success', (data) => {
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
              {typeof data.error === 'string' ? data.error : JSON.stringify(data.error)}
            </pre>
          )
        }
        setMessage(message)
      })
    }
  }, [secureFields])


  return <form onSubmit={e => {
    e.preventDefault()
    secureFields.submit()
  }}>
    <div style={{maxWidth: '400px'}}>
      {/* <!-- Card Number markup --> */}
      <SecureField
        fieldType='card'
        label='Card number'
        customClass={classnames(cardContainerClassNames)}
        callback={() => secureFields.focus('cardNumber')}>
        <SecureFieldIcon fieldType='card' iconType={cardIcon} />
      </SecureField>
    </div>
    <div style={{maxWidth: '150px', marginTop: '20px'}}>
      {/* <!-- CVV markup --> */}
      <SecureField
        fieldType='cvv'
        label='CVV'
        customClass={classnames(cvvContainerClassNames)}
        callback={() => secureFields.focus('cvv')}>
        <SecureFieldIcon fieldType='cvv' iconType={cvvIcon} />
      </SecureField>
    </div>
    <div style={{maxWidth: '400px', marginTop: '20px'}}>
      <button type="submit" id="form-submit">
          Submit
      </button>
      {message}
    </div>
  </form>
}
