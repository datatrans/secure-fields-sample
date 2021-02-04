import React from 'react'
import PropTypes from 'prop-types'

import images from '../../../assets/img/**/*.svg'

const SecureFieldIcon = ({ fieldType, iconType }) => <img alt={fieldType + '-' + iconType}
  className={'secure-field--card-icon secure-field--card-icon-' + iconType}
  src={iconType.includes('brands') ? images.brands[iconType.replace('brands/', '')] : images[iconType]} />

SecureFieldIcon.propTypes = {
  fieldType: PropTypes.string,
  iconType: PropTypes.string
}

export default SecureFieldIcon
