# MILIKI ERP — Waitlist Website Design & Development Guide

## 1. Project Overview

Build a modern, minimalist, responsive early-access waitlist website for **MILIKI ERP**.

MILIKI ERP is a business and asset management platform designed to help asset owners manage their assets, drivers, payments and daily business operations.

The platform targets:
- Motorcycle / Boda Boda owners
- Bajaj owners
- Truck owners
- Other business asset owners

The main objective of this website is to collect registrations from potential MILIKI customers before the official product launch.

This is a landing page, NOT a dashboard or a complete ERP application.

## 2. Technology Stack

Use the following technologies:

- React (Vite)
- JavaScript
- Tailwind CSS
- Lucide React for icons
- Google Apps Script for form submission.
- Google Sheets for registration storage.

Do not introduce unnecessary libraries or frameworks.

## 3. Brand Identity

### Logo

Brand name: MILIKI ERP

Logo presentation:
- Lowercase wordmark: `miliki erp`
- Main logo text: Black (#000000).
- Electric-blue dot accent: #0066FF.
- Bold, rounded sans-serif typography.
- Clean, flat 2D design.
- No gradients, 3D effects or unnecessary decorations.

The electric-blue dot is a distinctive brand element. Do not replace it with mint green.

### Color Palette

| Element | Color |
|---|---|
| Logo text | #000000 |
| Electric blue | #0066FF |
| Primary text | #171B2B |
| Secondary text | #687080 |
| Background | #FFFFFF |
| Borders | #E8E8EC |
| Subtle background | #F8F9FC |

Use electric blue selectively for important interactive elements and brand accents.

Avoid excessive use of blue.

## 4. Typography

Use **Inter** as the primary font throughout the website.

Google Fonts:
https://fonts.google.com/specimen/Inter

Font weights:
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700
- ExtraBold: 800

Typography guidelines:
- Large, bold and prominent hero headline.
- Comfortable body text.
- Clean and readable form labels.
- Consistent font sizing and spacing.
- Avoid decorative typography.

## 5. Overall Design Direction

Use the supplied design reference as the primary inspiration.

The design should feel like a premium SaaS startup landing page.

Visual characteristics:
- Minimalist.
- White background.
- Very subtle grid pattern across the background.
- Centered content.
- Generous whitespace.
- Clear typography hierarchy.
- Soft borders.
- Subtle rounded corners.
- Minimal shadows.
- Balanced spacing.

Do not introduce:
- Glassmorphism.
- Heavy gradients.
- Unnecessary illustrations.
- Large decorative images.
- Fake statistics.
- Testimonials.
- Pricing sections.
- Unnecessary navigation menus.
- Dashboard components.

Preserve the simple, centered composition of the reference.

## 6. Website Structure

The entire website should be a single-page landing page.

### A. Header

Create a minimal header.

Logo:
- Display the MILIKI ERP wordmark.
- Position it at the top center, following the reference design.
- Use black typography with the electric-blue dot.

Language switch:
- Position it at the top-right, relatively close to the header content.
- Use a compact EN / SW toggle.
- Default language: English.
- Clicking SW changes the entire website into Kiswahili.
- Clicking EN restores English.

Do not add unnecessary navigation links.

### B. Announcement Badge

Place a small announcement badge below the header.

English:
"Early access registration is now open."

Kiswahili:
"Usajili wa kupata nafasi ya awali umefunguliwa."

Use a subtle background and thin border.

### C. Hero Section

Keep the hero content centered.

English headline:

"Take control of your assets. Manage your business smarter."

Supporting heading:

"Join the MILIKI waitlist and be among the first to experience smarter asset management."

Description:

"MILIKI ERP helps asset owners manage their assets, drivers, payments and daily business operations from one connected platform. Whether you manage motorcycles, Bajaj or trucks, MILIKI gives you better control of what you own."

Kiswahili headline:

"Dhibiti mali zako. Simamia biashara yako kwa njia bora zaidi."

Supporting heading:

"Jiunge na orodha ya wanaosubiri na uwe miongoni mwa watumiaji wa kwanza wa MILIKI."

Description:

"MILIKI ERP inakusaidia kusimamia mali zako, madereva, malipo na shughuli za kila siku za biashara kupitia mfumo mmoja wa kidigitali. Iwe unasimamia pikipiki, Bajaj au malori, MILIKI inakupa udhibiti bora wa biashara yako."

Maintain good spacing between the announcement badge, headline, description and registration form.

### D. Waitlist Registration Form

This is the most important component.

Create a clean, compact and professional registration form.

Required fields:

**1. Full Name**
- Input type: text.
- Label: Full name.
- Placeholder: Enter your full name.

Kiswahili:
- Label: Jina kamili.
- Placeholder: Ingiza jina lako kamili.

**2. Phone Number (WhatsApp)**
- Input type: tel.
- Label: Phone number (WhatsApp).
- Placeholder: +255 7XX XXX XXX.
- Default country code: +255.
- Validate the phone number appropriately.

Kiswahili:
- Label: Namba ya simu (WhatsApp).
- Placeholder: +255 7XX XXX XXX.

**3. What assets do you manage?**
- Input type: select/dropdown.
- Placeholder: Select asset type.

Options:
- Motorcycles / Boda Boda
- Bajaj
- Trucks
- Other assets

Kiswahili:
- Unasimamia mali za aina gani?
- Pikipiki / Bodaboda
- Bajaj
- Malori
- Aina nyingine za mali

Submit button:

English:
"Join the Waitlist →"

Kiswahili:
"Jiunge na Orodha ya Usajili →"

Button styling:
- Electric-blue background (#0066FF).
- White text.
- Rounded corners.
- Smooth hover transition.
- Clear loading state while submitting.

Form functionality:
- All three fields are required.
- Validate inputs before submission.
- Prevent multiple submissions while processing.
- Display appropriate success and error feedback.
- Clear the form after successful registration.

### E. Footer

Keep the footer minimal.

English:

"Be among the first to experience MILIKI. Stay updated on our launch and early access opportunities."

Kiswahili:

"Kuwa miongoni mwa watumiaji wa kwanza wa MILIKI. Pata taarifa kuhusu uzinduzi na nafasi za kupata huduma mapema."

Social media icons:

Display ONLY:
- Instagram
- Facebook
- TikTok

Use Lucide React icons where available, or appropriate recognizable brand icons from a suitable icon library.

Do not include:
- Twitter / X
- LinkedIn
- YouTube
- WhatsApp
- Other social media icons.

Make the icons clickable, but use configurable social media URLs rather than inventing account links.

## 7. Google Sheets Integration

The registration form must connect to Google Sheets through a Google Apps Script Web App endpoint.

Do not create a PostgreSQL database or Django backend for this project.

Use an environment variable:

`VITE_GOOGLE_SCRIPT_URL`

Create a `.env.example` file showing the required configuration.

Expected registration data:

- fullName
- phoneNumber
- assetType

The Google Apps Script endpoint should store registrations in Google Sheets.

Important:
- Do not hardcode the endpoint URL into React components.
- Keep the integration in a separate service file.
- Handle network errors.
- Provide clear loading, success and failure states.
- Avoid claiming a registration succeeded when the request has not been confirmed.
- Do not expose private credentials in frontend code.
- Account for Google Apps Script cross-origin request limitations when implementing the submission flow.
- Never use `mode: "no-cors"` if the application needs to read the server response and verify success.

## 8. Internationalization

Implement proper bilingual support.

Languages:
- English (EN)
- Kiswahili (SW)

Requirements:
- English is the default.
- Language toggle must work.
- Every visible text element must change when switching languages.
- This includes headings, descriptions, form labels, placeholders, buttons, validation messages and footer text.
- Keep translations organized separately rather than scattering conditional text throughout components.
- Preserve the selected language while navigating or refreshing where practical.

## 9. Recommended Project Structure

Keep the project organized and maintainable.

```text
src/
├── assets/
├── components/
│   ├── Header.jsx
│   ├── LanguageToggle.jsx
│   ├── AnnouncementBadge.jsx
│   ├── Hero.jsx
│   ├── WaitlistForm.jsx
│   └── Footer.jsx
├── services/
│   └── waitlistService.js
├── locales/
│   ├── en.js
│   └── sw.js
├── App.jsx
├── main.jsx
└── index.css

.env
.env.example
design.md
```

This structure is a recommendation. Preserve the existing Vite configuration and avoid unnecessary restructuring.

## 10. Responsive Design

Desktop:
- Centered hero section.
- Compact registration form.
- Properly aligned header and language toggle.
- Generous whitespace.

Tablet:
- Maintain centered composition.
- Adjust typography and spacing.

Mobile:
- Full-width form inputs.
- Vertically stacked fields.
- Readable headline.
- Compact header.
- Accessible language toggle.
- Social icons centered in the footer.
- No horizontal overflow.

Test at common mobile, tablet and desktop screen sizes.

## 11. Accessibility and User Experience

- Use semantic HTML.
- Provide labels for every input.
- Ensure sufficient color contrast.
- Provide visible keyboard focus states.
- Make buttons and dropdowns keyboard accessible.
- Show validation errors clearly.
- Use appropriate ARIA attributes where necessary.
- Avoid unnecessary animations.

## 12. Development Instructions for GitHub Copilot

Before implementing:

1. Inspect the existing project structure.
2. Check installed dependencies and Tailwind configuration.
3. Read this design document carefully.
4. Preserve existing working configurations.
5. Do not unnecessarily rewrite existing files.

Implementation priorities:

1. Establish the brand styling and typography.
2. Build the header and language switch.
3. Build the centered hero section.
4. Build the registration form.
5. Implement English and Kiswahili translations.
6. Integrate Google Sheets submission.
7. Build the footer and social links.
8. Implement responsive layouts.
9. Test the entire registration flow.

The finished website should closely follow the supplied visual reference while using MILIKI's own brand identity.

**Primary objective: Create a beautiful, trustworthy and functional MILIKI ERP early-access registration website that converts interested asset owners into potential customers.**