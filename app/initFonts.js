import FontFaceObserver from 'fontfaceobserver';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPlusSquare
} from '@fortawesome/free-solid-svg-icons';

function registerOpenSans() {
  return new FontFaceObserver('Open Sans', {})
    .load()
    .then(
      () => document.body.classList.add('fontLoaded'),
      () => document.body.classList.remove('fontLoaded')
    );
}

function loadFontAwesome() {
  library.add(faPlusSquare);
}

export default () => {
  registerOpenSans();
  loadFontAwesome();
};
