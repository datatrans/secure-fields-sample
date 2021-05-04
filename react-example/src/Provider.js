import React, { useState, useMemo } from 'react'
import PropTypes from 'prop-types'

import SecureFieldsContext from './Context'

export default function SecureFieldsProvider ({ children }) {
  const [secureFields, setSecureFields] = useState(null)

  function closeSecureFields() {
    setSecureFields(null)
  }

  const value = useMemo(
    () => ({
      secureFields,
      setSecureFields,
      closeSecureFields
    }),
    [secureFields]
  )

  return <SecureFieldsContext.Provider value={value}>{children}</SecureFieldsContext.Provider>
}

SecureFieldsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
