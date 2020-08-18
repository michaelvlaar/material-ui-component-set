import * as Core from '@material-ui/core';
import * as Lab from '@material-ui/lab';
import * as Pickers from '@material-ui/pickers';
import * as Styles from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import Icons from './icons';
import i18n from 'i18next';
import {
  useTranslation,
  initReactI18next,
  withTranslation,
} from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Welcome: 'Welcome',
      },
    },
    nl: {
      translation: {
        Welcome: 'Welkom',
      },
    },
  },
  lng: 'nl',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

window.RedrawCallbacks = [];
window.I18n = i18n;
window.WithTranslation = withTranslation;
window.UseTranslation = useTranslation;

export default { Core, Icons, Lab, Pickers, Styles, DateFnsUtils };
