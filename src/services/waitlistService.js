const endpoint = import.meta.env.VITE_GOOGLE_SCRIPT_URL
const submissionTimeout = 20000

export function submitWaitlistRegistration(registration) {
  if (!endpoint) {
    return Promise.reject(new Error('VITE_GOOGLE_SCRIPT_URL is not configured.'))
  }

  let parsedEndpoint
  try {
    parsedEndpoint = new URL(endpoint)
  } catch {
    return Promise.reject(new Error('VITE_GOOGLE_SCRIPT_URL must be a valid URL.'))
  }

  if (parsedEndpoint.protocol !== 'https:') {
    return Promise.reject(new Error('The Google Apps Script endpoint must use HTTPS.'))
  }

  return new Promise((resolve, reject) => {
    const submissionId = crypto.randomUUID()
    const frameName = `miliki-submit-${submissionId}`
    const frame = document.createElement('iframe')
    const form = document.createElement('form')
    const fields = { ...registration, submissionId }
    let timeoutId

    frame.name = frameName
    frame.title = 'Waitlist registration response'
    frame.hidden = true
    form.method = 'POST'
    form.action = parsedEndpoint.href
    form.target = frameName
    form.hidden = true

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      form.append(input)
    })

    function cleanUp() {
      window.removeEventListener('message', handleMessage)
      window.clearTimeout(timeoutId)
      form.remove()
      frame.remove()
    }

    function handleMessage(event) {
      const trustedOrigin = event.origin === 'https://script.google.com'
        || event.origin.endsWith('.googleusercontent.com')
      if (!trustedOrigin) return

      const result = event.data
      if (result?.type !== 'MILIKI_WAITLIST_RESULT' || result.submissionId !== submissionId) return

      cleanUp()
      if (result.success === true) resolve()
      else reject(new Error('The Google Apps Script did not confirm the registration.'))
    }

    window.addEventListener('message', handleMessage)
    timeoutId = window.setTimeout(() => {
      cleanUp()
      reject(new Error('Timed out waiting for the Google Apps Script response.'))
    }, submissionTimeout)
    document.body.append(frame, form)
    form.submit()
  })
}
