import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      missing: {
        key: 'Thu cai coi {{data.firstName}} {{data.lastName}}',
      },
    },
  },
  de: {
    translation: {},
  },
}

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  saveMissing: true,
  interpolation: {
    escapeValue: false,
  },
  resources,
})
