import React, { useState, useMemo } from 'react'
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
