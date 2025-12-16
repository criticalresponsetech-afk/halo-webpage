import type { LeadPayload, LeadType } from '../types/leads'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function submitLead(type: LeadType, payload: LeadPayload) {
  await delay(900 + Math.random() * 600)
  const shouldFail = Math.random() < 0.12

  if (shouldFail) {
    throw new Error('Unable to submit right now. Please retry shortly.')
  }

  await Promise.all([
    sendAdminNotificationEmail(type, payload),
    sendRequesterConfirmationEmail(type, payload),
  ])
}

export async function sendAdminNotificationEmail(type: LeadType, payload: LeadPayload) {
  // TODO: Replace with call to a serverless email endpoint (e.g., /api/notify-admin)
  // For now, we mimic async delivery.
  await delay(200)
  console.debug('Mock admin email sent', { type, payload })
}

export async function sendRequesterConfirmationEmail(type: LeadType, payload: LeadPayload) {
  // TODO: Replace with call to a serverless email endpoint (e.g., /api/send-confirmation)
  // For now, we mimic async delivery.
  await delay(200)
  console.debug('Mock requester email sent', { type, payload })
}
