import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SecureFieldIcon extends Component {
  render() {
    const { fieldType, iconType } = this.props

    return <img alt={fieldType + '-' + iconType}
      className={'secure-field--card-icon secure-field--card-icon-' + iconType}
      src={'../../../assets/img/' + iconType + '.svg'} />
  }
}

SecureFieldIcon.propTypes = {
  fieldType: PropTypes.string,
  iconType: PropTypes.string
}

export default SecureFieldIcon
