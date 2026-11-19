import { useEffect, useMemo, useState } from 'react'
import PhoneInput, { getCountries, isValidPhoneNumber } from 'react-phone-number-input'
import phoneLabelsEn from 'react-phone-number-input/locale/en.json'
import { submitWaitlistRegistration } from './services/waitlistService.js'
import en from './locales/en.js'
import sw from './locales/sw.js'

const translations = { en, sw }
const assetTypes = ['motorcycles', 'bajaj', 'trucks', 'other']

function SocialIcon({ name }) {
  if (name === 'Instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.7" cy="6.7" r=".8" className="icon-fill" />
      </svg>
    )
  }

  if (name === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.2 21v-8h2.7l.4-3.1h-3.1V8c0-.9.3-1.5 1.6-1.5h1.7V3.7c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H8v3.1h2.8v8h3.4Z" className="icon-fill" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15.8 3c.2 2.1 1.4 3.4 3.5 3.5v3.2a8.6 8.6 0 0 1-3.5-1v6.5a5.6 5.6 0 1 1-5.6-5.6c.4 0 .7 0 1.1.1V13a2.3 2.3 0 1 0 1.4 2.1V3h3.1Z" className="icon-fill" />
    </svg>
  )
}

function App() {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('miliki-language') === 'sw' ? 'sw' : 'en'
    } catch {
      return 'en'
    }
  })
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', assetType: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const t = translations[language]
  const phoneLabels = useMemo(() => {
    const countryNames = new Intl.DisplayNames([language], { type: 'region' })
    const translatedCountries = Object.fromEntries(
      getCountries().map((country) => [country, countryNames.of(country) || country]),
    )
    return {
      ...phoneLabelsEn,
      ...translatedCountries,
      country: t.countryLabel,
      phone: t.fields.phone,
    }
  }, [language, t.countryLabel, t.fields.phone])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  function changeLanguage(nextLanguage) {
    setLanguage(nextLanguage)
    setErrors({})
    try {
      localStorage.setItem('miliki-language', nextLanguage)
    } catch {
      // The language toggle still works when browser storage is unavailable.
    }
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setStatus('idle')
  }

  function updatePhoneNumber(phoneNumber) {
    setForm((current) => ({ ...current, phoneNumber: phoneNumber || '' }))
    setErrors((current) => ({ ...current, phoneNumber: '' }))
    setStatus('idle')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!form.fullName.trim()) nextErrors.fullName = t.validation.name
    if (!form.phoneNumber || !isValidPhoneNumber(form.phoneNumber)) nextErrors.phoneNumber = t.validation.phone
    if (!assetTypes.includes(form.assetType)) nextErrors.assetType = t.validation.asset

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    setStatus('submitting')
    try {
      await submitWaitlistRegistration({
        fullName: form.fullName.trim(),
        phoneNumber: form.phoneNumber,
        assetType: form.assetType,
      })
      setForm({ fullName: '', phoneNumber: '', assetType: '' })
      setStatus('success')
    } catch (error) {
      console.error('Waitlist registration failed:', error)
      setStatus('error')
    }
  }

  const socials = [
    ['Instagram', import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/milikierp/'],
    ['Facebook', import.meta.env.VITE_FACEBOOK_URL || 'https://www.facebook.com/milikierp'],
    ['TikTok', import.meta.env.VITE_TIKTOK_URL || 'https://www.tiktok.com/@milikierp'],
  ]

  return (
    <div className="page-shell">
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Miliki ERP home">
          miliki erp<span>.</span>
        </a>
        <div className="language-toggle" role="group" aria-label={t.languageLabel}>
          {['en', 'sw'].map((option) => (
            <button
              key={option}
              type="button"
              className={language === option ? 'language-option is-active' : 'language-option'}
              aria-pressed={language === option}
              onClick={() => changeLanguage(option)}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="announcement">
            <span className="announcement-dot" aria-hidden="true" />
            <span>{t.announcement}</span>
          </div>
          <h1 id="hero-title">{t.headline}</h1>
          <p className="hero-supporting">{t.supporting}</p>
          <p className="hero-description">{t.description}</p>
        </section>

        <form className="waitlist-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="fullName">{t.fields.name}</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder={t.placeholders.name}
              value={form.fullName}
              onChange={updateField}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              required
            />
            {errors.fullName && <span className="field-error" id="fullName-error">{errors.fullName}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="phoneNumber">{t.fields.phone}</label>
            <PhoneInput
              className={`phone-number-input${errors.phoneNumber ? ' has-error' : ''}`}
              defaultCountry="TZ"
              labels={phoneLabels}
              value={form.phoneNumber || undefined}
              onChange={updatePhoneNumber}
              placeholder="+255 7XX XXX XXX"
              countrySelectProps={{ 'aria-label': t.countryLabel }}
              numberInputProps={{
                id: 'phoneNumber',
                name: 'phoneNumber',
                autoComplete: 'tel',
                inputMode: 'tel',
                'aria-invalid': Boolean(errors.phoneNumber),
                'aria-describedby': errors.phoneNumber ? 'phoneNumber-error' : undefined,
                required: true,
              }}
            />
            {errors.phoneNumber && <span className="field-error" id="phoneNumber-error">{errors.phoneNumber}</span>}
          </div>

          <div className="field-group">
            <label htmlFor="assetType">{t.fields.asset}</label>
            <select
              id="assetType"
              name="assetType"
              value={form.assetType}
              onChange={updateField}
              aria-invalid={Boolean(errors.assetType)}
              aria-describedby={errors.assetType ? 'assetType-error' : undefined}
              required
            >
              <option value="" disabled>{t.placeholders.asset}</option>
              {assetTypes.map((asset) => <option key={asset} value={asset}>{t.assets[asset]}</option>)}
            </select>
            {errors.assetType && <span className="field-error" id="assetType-error">{errors.assetType}</span>}
          </div>

          <button className="submit-button" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? t.submitting : <>{t.submit}<span aria-hidden="true"> →</span></>}
          </button>
          <p className={`form-feedback ${status}`} role="status" aria-live="polite">
            {status === 'success' ? t.success : status === 'error' ? t.failure : ''}
          </p>
        </form>
      </main>

      <footer className="site-footer">
        <p>{t.footer}</p>
        <nav className="social-links" aria-label={t.socialLabel}>
          {socials.map(([name, url]) => (
            <a
              key={name}
              href={url || undefined}
              aria-label={name}
              aria-disabled={!url}
              tabIndex={url ? 0 : -1}
              onClick={(event) => { if (!url) event.preventDefault() }}
              target={url ? '_blank' : undefined}
              rel={url ? 'noreferrer' : undefined}
            >
              <SocialIcon name={name} />
            </a>
          ))}
        </nav>
        <small>{t.copyright}</small>
      </footer>
    </div>
  )
}

export default App
