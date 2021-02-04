import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import SecureFieldsContext from './Context'

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'


const initSecureFields = ({ transactionId, fields }) => {
  const secureFields = new window.SecureFields()
  secureFields.init(transactionId, fields)
  return secureFields
}

const cleanupSecureFields = () => {
  if (window.SecureFields) {
    window.setTimeout(() => {
      try {
        // window.Datatrans.close()
      } catch (err) {
        // eslint-disable-line no-empty
      }
    }, 1)
  }
}

const SecureFields = (props) => {
  const { secureFields, setSecureFields } = useContext(SecureFieldsContext)

  useEffect(() => {
    if (secureFields) {
      // already loaded
      return
    }

    const { production } = props
    const scriptSource = getUrl(production)
    let scope

    if (document.querySelector('script[src="' + scriptSource + '"]')) {
      scope = initSecureFields(props)
      setSecureFields(scope)

      return cleanupSecureFields
    }

    const script = document.createElement('script')
    script.src = scriptSource
    script.onload = () => {
      scope = initSecureFields(props)
      setSecureFields(scope)
    }

    document.body.appendChild(script)

    return cleanupSecureFields
  })

  useEffect(() => {
    if (secureFields) {
      secureFields.on('ready', () => props.onReady())
      secureFields.on('success', (data) => props.onSuccess(data))
      secureFields.on('validate', (data) => props.onValidate(data))
      secureFields.on('change', (data) => {
        console.log(data)
        props.onChange(data)
      })
      secureFields.on('error', (data) => {
        console.log(data)
        props.onError(data)
      })
    }
  }, [secureFields])

  return null
}

SecureFields.propTypes = {
  transactionId: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    cardNumber: PropTypes.string,
    cvv: PropTypes.string
  }),

  onReady: PropTypes.func,
  onSuccess: PropTypes.func,
  onValidate: PropTypes.func,
  onChange: PropTypes.func,
  onError: PropTypes.func,

  production: PropTypes.bool
}

SecureFields.defaultProps = {
  onReady() {},
  onSuccess() {},
  onValidate() {},
  onChange() {},
  onError() {},
  production: false
}

export default SecureFields
