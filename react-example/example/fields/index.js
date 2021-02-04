import React, { useState, useContext, useEffect } from 'react'
import clx from 'classnames'

import SecureFieldsContext from '../../src/Context'

import SecureField from './SecureField'
import SecureFieldIcon from './SecureFieldIcon'

import './SecureField.css'

export default function StyledFields({ isReady, paymentMethod, error }) {
  const { secureFields } = useContext(SecureFieldsContext)

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
  // ask for the expiry in your form
  const expiry = {
    expm: 12,
    expy: 25
  }

  const [cardIcon, setCardIcon] = useState('card-empty')
  const [cvvIcon, setCvvIcon] = useState('cvc-empty')
  const [cardContainerClassNames, setCardContainerClassNames] = useState(initalCssClass)
  const [cvvContainerClassNames, setCvvContainerClassNames] = useState(initalCssClass)

  useEffect(() => {
    if (!secureFields || !paymentMethod) {
      return
    }

    setCardIcon(paymentMethod ? ('brands/'+ paymentMethod) : 'card-empty')
    setCardContainerClassNames({
      ...cardContainerClassNames,
      'secure-field__is-recognized': !!paymentMethod,
      'secure-field__has-error': !!error
    })
    setCvvContainerClassNames({
      ...cvvContainerClassNames,
      'secure-field__is-recognized': !!paymentMethod,
      'secure-field__has-error': !!error
    })

    if (error === 'card') {
      setCardIcon('card-error')
    }
    if (error === 'cvv') {
      setCvvIcon('cvc-error')
    } else {
      setCvvIcon('cvc-empty')
    }
  }, [secureFields, paymentMethod, error])

  return <form onSubmit={() => secureFields.submit(expiry)} style={{ margin: '0 auto', width: '400px' }}>
  {!isReady && <span className='loader'></span>}
  <div style={{maxWidth: '400px'}}>
    {/* <!-- Card Number markup --> */}
    <SecureField
      fieldType='card'
      label='Card Number'
      customClass={clx(cardContainerClassNames)}
      callback={() => secureFields.focus('cardNumber')}>
      <SecureFieldIcon fieldType='card' iconType={cardIcon} />
    </SecureField>
  </div>
  <div style={{maxWidth: '150px', marginTop: '20px'}}>
    {/* <!-- CVV markup --> */}
    <SecureField
      fieldType='cvv'
      label='CVV'
      customClass={clx(cvvContainerClassNames)}
      callback={() => secureFields.focus('cvv') }>
      <SecureFieldIcon fieldType='cvv' iconType={cvvIcon} />
    </SecureField>
  </div>
  <div style={{maxWidth: '400px', marginTop: '20px'}}>
    <button type="button" id="form-submit" onClick={() => secureFields.submit(expiry)} disabled={!isReady}>
      Submit
    </button>
  </div>
</form>
}
