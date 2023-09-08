import { Field } from './field'
import { Icon } from './icon'
import { useEffect, useState } from 'react'

const getUrl = production =>
  production
    ? 'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'
    : 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'

export function SecureFields({
  transactionId,
  fields,
  options,
  production,
  onSuccess,
  onReady,
  onValidate,
  onClear,
  onChange,
  onError
}) {
  const [secureFields, setSecureFields] = useState()
  const [expm, setExpm] = useState()
  const [expy, setExpy] = useState()
  const [error, setError] = useState()
  const [cardIcon, setCardIcon] = useState('card-empty')
  const [cvvIcon, setCvvIcon] = useState('cvv-empty')
  const [isLoading, setIsLoading] = useState(true)

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
        onReady()
        setIsLoading(false)
      })
      secureFields.on('clear', onClear)

      // Set class names and icon when fields change
      secureFields.on('change', data => {
        let paymentMethod = data.fields.cardNumber.paymentMethod
          ? data.fields.cardNumber.paymentMethod
          : false

        setError(null)
        setCardIcon(paymentMethod ? paymentMethod : 'card-empty')
        setCvvIcon('cvv-empty')
        onChange(data)
      })

      // Set error icon and class name on validate failure
      secureFields.on('validate', data => {
        if (!data.fields.cardNumber.valid) {
          setCardIcon('card-error')
        }

        if (!data.fields.cvv.valid) {
          setCvvIcon('cvv-error')
        }
        onValidate(data)
      })

      secureFields.on('error', data => {
        console.error(data)
        setError(data)
        onError(data)
        setIsLoading(false)
      })

      // Show transaction ID on success or transaction error message
      secureFields.on('success', data => {
        console.log(data)
        if (data.transactionId) {
          onSuccess(data.transactionId)
        } else if (data.error) {
          setError(data.error)
          onError(data)
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
        <div className='pb-2 pl-2'>
          <label>Expiration Date</label>
          <div className='flex items-end'>
            <input
              type='tel'
              maxLength={2}
              className='h-[3.1rem] w-10 py-4 border text-center mr-2'
              placeholder='MM'
              value={expm}
              onChange={e => setExpm(e.target.value)}
            />
            <input
              type='tel'
              maxLength={2}
              className='h-[3.1rem] w-10 py-4 border text-center'
              placeholder='YY'
              value={expy}
              onChange={e => setExpy(e.target.value)}
            />
          </div>
        </div>
      </div>
      <button
        type='submit'
        className={`bg-[#3eb55f] text-white mt-2 px-4 py-1 font-semibold leading-6 text-sm transition ease-in-out duration-150 ${
          error && 'cursor-not-allowed opacity-25'
        }`}
        disabled={isLoading || error}>
        {isLoading && (
          <svg
            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
        )}
        Submit
      </button>

      {error && <p className='bg-red-400 p-2 mt-4 text-white'>{error}</p>}
    </form>
  )
}
