import { useTranslation } from 'react-i18next'
const data = {
  firstName: 'First Name',
  lastName: 'Last Name',
}

function I18next() {
  const { t, i18n } = useTranslation()
  return (
    <div>
      <button
        onClick={() => {
          if (i18n.language === 'en') {
            i18n.changeLanguage('de')
            return
          }
          i18n.changeLanguage('en')
        }}>
        en/de
      </button>
      <p>{t('missing.key', 'Default Missing Message', { data })}</p>
      <p>{t('{{data.firstName}} {{data.lastName}}', 'THu cai coi {{data.firstName}}', { data })}</p>
    </div>
  )
}

export const I18nextRoute = {
  path: '/i18next',
  element: <I18next />,
}
