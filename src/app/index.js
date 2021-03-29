import '../style/style.scss';

import { initialize } from 'minimal-analytics'
import '@fortawesome/fontawesome-free/js/fontawesome'
import './icons';
//import '@fortawesome/fontawesome-free/js/solid'
//import '@fortawesome/fontawesome-free/js/regular'
//import '@fortawesome/fontawesome-free/js/brands'

// Initialize Google Analytics.
initialize(window, 'UA-XXXXXXXXX-X', {
  anonymizeIp: true,
  colorDepth: true,
  characterSet: true,
  screenSize: true,
  language: true
})