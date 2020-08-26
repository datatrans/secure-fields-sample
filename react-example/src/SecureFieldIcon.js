import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cardrecognized from '../../assets/img/card-recognized.svg'
import cardempty from '../../assets/img/card-empty.svg'
import carderror from '../../assets/img/card-error.svg'
import cvcempty from '../../assets/img/cvc-empty.svg'
import cvcerror from '../../assets/img/cvc-error.svg'

import AMX from '../../assets/img/brands/AMX.svg'
import CUP from '../../assets/img/brands/CUP.svg'
import DIN from '../../assets/img/brands/DIN.svg'
import DIS from '../../assets/img/brands/DIS.svg'
import DNK from '../../assets/img/brands/DNK.svg'
import ECA from '../../assets/img/brands/ECA.svg'
import ELO from '../../assets/img/brands/ELO.svg'
import JCB from '../../assets/img/brands/JCB.svg'
import MAU from '../../assets/img/brands/MAU.svg'
import UAP from '../../assets/img/brands/UAP.svg'
import VIS from '../../assets/img/brands/VIS.svg'
import VPY from '../../assets/img/brands/VPY.svg'

const icons = {
  'card-error': carderror,
  'card-empty': cardempty,
  'card-recognized': cardrecognized,
  'cvc-error': cvcerror,
  'cvc-empty': cvcempty,
  'brands/AMX': AMX,
  'brands/CUP': CUP,
  'brands/DIN': DIN,
  'brands/DIS': DIS,
  'brands/DNK': DNK,
  'brands/ECA': ECA,
  'brands/ELO': ELO,
  'brands/JCB': JCB,
  'brands/MAU': MAU,
  'brands/UAP': UAP,
  'brands/VIS': VIS,
  'brands/VPY': VPY
}

class SecureFieldIcon extends Component {
  render() {
    const { fieldType, iconType } = this.props

    return <img alt={fieldType + '-' + iconType}
      className={'secure-field--card-icon secure-field--card-icon-' + iconType}
      src={icons[iconType]} />
  }
}

SecureFieldIcon.propTypes = {
  fieldType: PropTypes.string,
  iconType: PropTypes.string
}

export default SecureFieldIcon
