import React, { useState, useContext } from 'react'
import clx from 'classnames'

import SecureFields from '../../src'

import SecureField from './SecureField'
import SecureFieldIcon from './SecureFieldIcon'

import './SecureField.css'

export default function StyledFields() {
  const { secureFields } = useContext(SecureFields.Context)

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

  const message = null
  const cardIcon = 'card-empty'
  const cvvIcon = 'cvc-empty'
  const cardContainerClassNames = initalCssClass
  const cvvContainerClassNames = initalCssClass

  return <form onSubmit={() => secureFields.submit()}>
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
      callback={() => secureFields.focus('cvv')}>
      <SecureFieldIcon fieldType='cvv' iconType={cvvIcon} />
    </SecureField>
  </div>
  <div style={{maxWidth: '400px', marginTop: '20px'}}>
    <button type="button" id="form-submit" onClick={() => secureFields.submit()}>
      Submit
    </button>
    {message}
  </div>
</form>
}
