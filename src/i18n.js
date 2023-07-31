import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    supportedLngs: ['fi', 'en'],
    fallbackLng: {
      'fi-FI': ['fi'],
      default: ['en']
    },
    debug: false,
    ns: [],
    defaultNS: false,
    keySeparator: false,
    lowerCaseLng: true
  })

export default i18n
