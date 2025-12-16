# HALO Security Marketing Site

Modern React + TypeScript + Vite marketing site for HALO Security with Tailwind CSS and React Router. Fully responsive with reusable UI components, trust signals, and lead capture forms.

## Getting started

1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Build for production: `npm run build`
4. Preview the production build: `npm run preview`

## Structure

- `src/components`: Reusable UI (Header, Footer, Button, inputs, Toast, Modal, cards, sections).
- `src/pages`: Routed pages (home, services, about, quote, contact, careers, FAQ, testimonials, 404).
- `src/lib/content.ts`: Centralized marketing copy, nav, services, FAQs, testimonials.
- `src/lib/leads.ts`: Mocked `submitLead` plus placeholder email functions.
- `src/types/leads.ts`: Strong typing for lead payloads.

## Forms and lead flow

- Contact form (`/contact`) and Quote form (`/quote`) include client-side validation and inline errors.
- On submit, both forms call `submitLead(type, payload)` which simulates latency/success/failure.
- On success, forms reset and a toast appears; on failure, values are preserved and an error toast is shown.
- Mock email sending lives in `src/lib/leads.ts` (`sendAdminNotificationEmail`, `sendRequesterConfirmationEmail`).

### Plugging in real email delivery

Replace the TODOs in `src/lib/leads.ts` with calls to your email or notification service (e.g., POST to a serverless endpoint like `/api/notify-admin` and `/api/send-confirmation`). Keep the `submitLead` abstraction so pages stay untouched.

## Styling

Tailwind is configured in `tailwind.config.ts` with a dark, tactical palette (charcoal with cyan accent). Global styles are in `src/index.css` with the Space Grotesk typeface.
