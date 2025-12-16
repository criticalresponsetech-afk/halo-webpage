export type LeadType = 'contact' | 'quote' | 'callback'

export interface ContactLeadPayload {
  fullName: string
  email: string
  phone?: string
  message: string
}

export interface QuoteLeadPayload {
  fullName: string
  email: string
  phone: string
  serviceType: 'Private Security' | 'Armed Security' | 'Mobile Patrols'
  propertyType: 'Residential' | 'Commercial' | 'Construction' | 'Industrial'
  location: string
  contactMethod: 'Phone' | 'Email'
  details: string
}

export interface CallbackLeadPayload {
  fullName: string
  company: string
  phone: string
  email: string
  bestTime: string
  contactPreference: 'Phone' | 'Email'
  notes?: string
}

export type LeadPayload = ContactLeadPayload | QuoteLeadPayload | CallbackLeadPayload
