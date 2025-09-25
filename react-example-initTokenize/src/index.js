import React from 'react'
import { createRoot } from 'react-dom/client'

import SecureFields from './SecureFields'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <SecureFields config={{
    merchantID: '1100007006',
    fields:{
      cardNumber: {
        placeholderElementId: 'card-number',
        inputType: 'tel'
      },
      cvv: {
        placeholderElementId: 'cvv-number',
        inputType: 'tel'
      }
    },
    options: {}
  }} />
)
