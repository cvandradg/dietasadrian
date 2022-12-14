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

import { faClipboardQuestion } from '@fortawesome/pro-light-svg-icons';

import { faGripLines } from '@fortawesome/pro-thin-svg-icons';

import {
  faPlus,
  faBolt,
  faDrumstick,
  faBowlRice,
  faPeanuts,
} from '@fortawesome/sharp-solid-svg-icons';

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
      faPlus,
      faXmark,
      faBolt,
      faDrumstick,
      faBowlRice,
      faPeanuts,
      faPersonDress,
      faPerson
    );
  }
}
