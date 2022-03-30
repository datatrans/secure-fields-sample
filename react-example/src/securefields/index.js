import { Field } from './field'
import { Icon } from './icon'
import { useEffect, useState } from 'react'

const getUrl = production =>
  production
    ? 'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'
    : 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'

export function SecureFields({ transactionId, fields, options, production, onSuccess }) {
  const [secureFields, setSecureFields] = useState()
  const [expm, setExpm] = useState(12)
  const [expy, setExpy] = useState(25)
  const [error, setError] = useState('')
  const [cardIcon, setCardIcon] = useState('card-empty')
  const [cvvIcon, setCvvIcon] = useState('cvv-empty')

  const initSecureFields = () => {
    const initalizedSecureFields = new window.SecureFields()
    initalizedSecureFields.init(transactionId, fields, options)
    setSecureFields(initalizedSecureFields)
  }

  const cleanupSecureFields = () => {
    if (secureFields) {
      window.setTimeout(() => {
        try {
          secureFields.destroy()
          setSecureFields(null)
        } catch (err) {
          alert('err', err)
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
      // Set class names and icon when fields change
      secureFields.on('change', data => {
        let paymentMethod = data.fields.cardNumber.paymentMethod
          ? data.fields.cardNumber.paymentMethod
          : false

        setMessage(null)
        setCardIcon(paymentMethod ? paymentMethod : 'card-empty')
        setCvvIcon('cvv-empty')
      })

      // Set error icon and class name on validate failure
      secureFields.on('validate', data => {
        if (!data.fields.cardNumber.valid) {
          setCardIcon('card-error')
        }

        if (!data.fields.cvv.valid) {
          setCvvIcon('cvv-error')
        }
      })

      // Show transaction ID on success or transaction error message
      secureFields.on('success', data => {
        let message = null
        if (data.transactionId) {
          onSuccess(data.transactionId)
          // message = (
          //   <>
          //     <pre>Data submitted successfully with transaction # {data.transactionId}</pre>
          //     <code style={{ userSelect: 'all' }}>
          //       <pre className='bg-[#eaeaea] p-2' style={{ maxWidth: '700px' }}>
          //         curl 'https://api.sandbox.datatrans.com/v1/transactions/{data.transactionId}
          //         /authorize' \<br />
          //         --header 'Authorization: Basic {basicAuth}' \<br />
          //         --header 'Content-Type: application/json' \<br />
          //         --data-raw '
          //         {JSON.stringify(
          //           {
          //             refno: 'react-secure-fields',
          //             amount: parseInt(amount, 10),
          //             autoSettle: true
          //           },
          //           null,
          //           ' '
          //         )}
          //         '
          //       </pre>
          //     </code>
          //   </>
          // )
        } else if (data.error) {
          setError(data.error)
        }
      })
    }
  }, [secureFields])

  return (
    <form
      className='max-w-md'
      onSubmit={e => {
        e.preventDefault()
        secureFields.submit({
          expm,
          expy
        })
      }}>
      {/* <!-- Card Number markup --> */}
      <Field
        fieldType={fields.cardNumber.placeholderElementId}
        label={fields.cardNumber.label}
        callback={() => secureFields.focus(fields.cardNumber.placeholderElementId)}>
        <Icon fieldType={fields.cardNumber.placeholderElementId} iconType={cardIcon} />
      </Field>
      {/* <!-- CVV markup --> */}
      <div className='flex justify-between'>
        <Field
          className='flex-1'
          fieldType={fields.cvv.placeholderElementId}
          label={fields.cvv.label}
          callback={() => secureFields.focus(fields.cvv.placeholderElementId)}>
          <Icon fieldType={fields.cvv.placeholderElementId} iconType={cvvIcon} />
        </Field>
        <div className='flex items-end pb-2 pl-2'>
          <input
            type='tel'
            maxLength={2}
            className='h-[3.1rem] w-10 py-4 border text-center mr-2'
            placeholder='MM'
            value={expm}
            onChange={setExpm}
          />
          <input
            type='tel'
            maxLength={2}
            className='h-[3.1rem] w-10 py-4 border text-center'
            placeholder='YY'
            value={expy}
            onChange={setExpy}
          />
        </div>
      </div>

      <button type='submit' className='bg-[#3eb55f] text-white px-4 py-2'>
        Submit
      </button>

      {error && <pre>{error}</pre>}
    </form>
  )
}
