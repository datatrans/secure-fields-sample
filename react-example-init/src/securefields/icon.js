import AMX from 'url:../../../assets/img/brands/AMX.svg'
import CUP from 'url:../../../assets/img/brands/CUP.svg'
import DIN from 'url:../../../assets/img/brands/DIN.svg'
import DIS from 'url:../../../assets/img/brands/DIS.svg'
import DNK from 'url:../../../assets/img/brands/DNK.svg'
import ECA from 'url:../../../assets/img/brands/ECA.svg'
import ELO from 'url:../../../assets/img/brands/ELO.svg'
import JCB from 'url:../../../assets/img/brands/JCB.svg'
import MAU from 'url:../../../assets/img/brands/MAU.svg'
import UAP from 'url:../../../assets/img/brands/UAP.svg'
import VIS from 'url:../../../assets/img/brands/VIS.svg'
import VPY from 'url:../../../assets/img/brands/VPY.svg'
import cardEmpty from 'url:../../../assets/img/card-empty.svg'
import cardError from 'url:../../../assets/img/card-error.svg'
import cardRecognized from 'url:../../../assets/img/card-recognized.svg'
import cvcEmpty from 'url:../../../assets/img/cvc-empty.svg'
import cvcError from 'url:../../../assets/img/cvc-error.svg'

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
