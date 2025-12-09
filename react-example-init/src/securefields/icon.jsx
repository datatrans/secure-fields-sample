import AMX from '../../../assets/img/brands/AMX.svg'
import CUP from '../../../assets/img/brands/CUP.svg'
import DIN from '../../../assets/img/brands/DIN.svg'
import DIS from '../../../assets/img/brands/DIS.svg'
import DNK from '../../../assets/img/brands/DNK.svg'
import ECA from '../../../assets/img/brands/ECA.svg'
import ELO from '../../../assets/img/brands/ELO.svg'
import JCB from '../../../assets/img/brands/JCB.svg'
import MAU from '../../../assets/img/brands/MAU.svg'
import UAP from '../../../assets/img/brands/UAP.svg'
import VIS from '../../../assets/img/brands/VIS.svg'
import VPY from '../../../assets/img/brands/VPY.svg'
import cardEmpty from '../../../assets/img/card-empty.svg'
import cardError from '../../../assets/img/card-error.svg'
import cardRecognized from '../../../assets/img/card-recognized.svg'
import cvcEmpty from '../../../assets/img/cvc-empty.svg'
import cvcError from '../../../assets/img/cvc-error.svg'

const ICON_MAP = {
  'card-empty': cardEmpty,
  'card-error': cardError,
  'card-recognized': cardRecognized,
  'cvv-empty': cvcEmpty,
  'cvv-error': cvcError,
  AMX,
  CUP,
  DIN,
  DIS,
  DNK,
  ECA,
  ELO,
  JCB,
  MAU,
  UAP,
  VIS,
  VPY
}

export function Icon({ fieldType, iconType }) {
  return (
    <img
      alt={fieldType + '-' + iconType}
      className={['card-error', 'cvv-error'].includes(iconType) ? 'h-6' : 'h-10'}
      src={ICON_MAP[iconType]}
    />
  )
}
