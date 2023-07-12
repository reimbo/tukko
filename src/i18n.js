import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: {
    'fi-FI': ['fi'],
    default: ['en']
    },
    debug: false,
    ns:['sensors', 'units'],
    keySeparator: false
  })

export default i18n
