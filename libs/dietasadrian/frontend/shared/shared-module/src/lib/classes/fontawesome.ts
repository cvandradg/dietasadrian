import { Directive } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import {
  faBookOpenCover,
  faPlateUtensils,
  faTurkey,
  faLayerPlus,
  faTrashCan,
  faCaretRight,
  faFilePen,
  faXmark,
  faPersonDress,
  faPerson,
} from '@fortawesome/pro-duotone-svg-icons';

import {
  faClipboardQuestion,
  faRightToBracket,
  faEnvelopeCircleCheck,
} from '@fortawesome/pro-light-svg-icons';

import { faGripLines } from '@fortawesome/pro-thin-svg-icons';

import {
  faPlus,
  faBolt,
  faDrumstick,
  faBowlRice,
  faPeanuts,
} from '@fortawesome/sharp-solid-svg-icons';

import {
  faArrowRight,
  faXmark as faXmarkSolid,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGoogle,
  faTwitter,
  faFacebookF,
} from '@fortawesome/free-brands-svg-icons';

import {
  faSpinnerThird,
  faUser,
  faCircleNotch,
  faMessageExclamation,
  faBars,
} from '@fortawesome/pro-solid-svg-icons';




@Directive()
export class Fontawesome {
  constructor(private library: FaIconLibrary) {
    library?.addIcons(
      faBookOpenCover,
      faPlateUtensils,
      faTurkey,
      faLayerPlus,
      faTrashCan,
      faCaretRight,
      faFilePen,
      faClipboardQuestion,
      faGripLines,
      faCheck,
      faPlus,
      faXmark,
      faBolt,
      faDrumstick,
      faBowlRice,
      faPeanuts,
      faPersonDress,
      faPerson,
      faArrowRight,
      faGoogle,
      faTwitter,
      faFacebookF,
      faMessageExclamation,
      faRightToBracket,
      faSpinnerThird,
      faXmarkSolid,
      faUser,
      faCircleNotch,
      faEnvelopeCircleCheck,
      faBars
    );
  }
}
