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


    // Set class names and icon when fields change
    // secureFields.on('change', (data) => {
    //   let paymentMethod = data.fields.cardNumber.paymentMethod
    //     ? data.fields.cardNumber.paymentMethod
    //     : false

    //   console.log(paymentMethod)

      // this.setState(prevState => ({
      //   message: null,
      //   cardContainerClassNames: {
      //     ...prevState.cardContainerClassNames,
      //     'secure-field__is-recognized': !!paymentMethod,
      //     'secure-field__has-error': false
      //   },
      //   cvvContainerClassNames: {
      //     ...prevState.cvvContainerClassNames,
      //     'secure-field__has-error': false
      //   },
      //   cardIcon: paymentMethod ? ('brands/'+ paymentMethod) : 'card-empty',
      //   cvvIcon: 'cvc-empty'
      // }))
    // })

    // Set error icon and class name on validate failure
    // secureFields.on('validate', (data) => {
    //   if (!data.fields.cardNumber.valid) {
    //     this.setState(prevState => ({
    //       cardContainerClassNames: {
    //         ...prevState.cardContainerClassNames,
    //         'secure-field__is-recognized': false,
    //         'secure-field__has-error': true
    //       },
    //       cardIcon: 'card-error'
    //     }))
    //   }

    //   if (!data.fields.cvv.valid) {
    //     this.setState(prevState => ({
    //       cvvContainerClassNames: {
    //         ...prevState.cvvContainerClassNames,
    //         'secure-field__has-error': true
    //       },
    //       cvvIcon: 'cvc-error'
    //     }))
    //   }
    // })

    // // Show transaction ID on success or transaction error message
    // secureFields.on('success', (data) => {
    //   let message = null
    //   if (data.transactionId) {
    //     message = (
    //       <pre className={'form-result success'} style={{marginTop: '20px', fontSize: '1rem'}}>
    //         Data submitted successfully with transaction # {data.transactionId}
    //       </pre>
    //     )
    //   } else if (data.error) {
    //     message = (
    //       <pre className={'form-result ' + data.result} style={{marginTop: '20px', fontSize: '1rem'}}>
    //         {data.error}
    //       </pre>
    //     )
    //   }
    //   this.setState({message: message})
    // })
  }, [secureFields, paymentMethod, error])

  return <form onSubmit={() => secureFields.submit()} style={{ margin: '0 auto', width: '400px' }}>
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
    <button type="button" id="form-submit" onClick={() => secureFields.submit()} disabled={!isReady}>
      Submit
    </button>
  </div>
</form>
}
