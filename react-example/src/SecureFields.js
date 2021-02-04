import { useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import SecureFieldsContext from './Context'

const getUrl = (production) => production
  ? 'https://pay.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'
  : 'https://pay.sandbox.datatrans.com/upp/payment/js/secure-fields-2.0.0.min.js'


const initSecureFields = ({ transactionId, fields }) => {
  const { setSecureFields } = useContext(SecureFieldsContext)
  const secureFields = new window.SecureFields()
  secureFields.init(transactionId, fields)
  setSecureFields(secureFields)
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
  useEffect(() => {
    const { production } = props
    const scriptSource = getUrl(production)

    if (document.querySelector('script[src="' + scriptSource + '"]')) {
      initSecureFields(props)

      return cleanupSecureFields
    }

    const script = document.createElement('script')
    script.src = scriptSource
    script.onload = () => {
      initSecureFields(props)
    }

    document.body.appendChild(script)

    return cleanupSecureFields
  })

  return null
}

SecureFields.propTypes = {
  transactionId: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    cardNumber: PropTypes.string,
    cvv: PropTypes.string
  }),
  production: PropTypes.bool
}

SecureFields.defaultProps = {
  production: false
}

export default SecureFields
