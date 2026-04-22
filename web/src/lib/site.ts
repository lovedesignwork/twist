/**
 * Site-wide content config — pulled from twistphuket.com for accuracy.
 * Edit here, never hard-code in components.
 */

export const SITE = {
  name: "TWIST",
  tagline: "Rooftop Restaurant & Bar · Phuket Old Town",
  description:
    "Rooftop Bar Phuket Old Town - 19th Royal Phuket City Hotel. Experience the best sunset panoramic view in Phuket Old Town, indulge in a special dinner while savoring International local fusion-style cuisine!",
  address: {
    line1: "19th Floor, Royal Phuket City Hotel",
    line2: "154 Phang Nga Road",
    city: "Phuket Old Town",
    postcode: "83000",
    country: "Thailand",
    geo: { lat: 7.8804, lng: 98.3923 },
    google:
      "https://www.google.com/maps/search/?api=1&query=Royal+Phuket+City+Hotel",
  },
  hours: [
    { label: "Bar", value: "17:00 → LATE" },
    { label: "Kitchen", value: "17:00 → 23:00" },
    { label: "Live music", value: "19:00 → 21:00" },
  ],
  /** Display format for the public phone number. */
  phone: "099 157 8143",
  /** E.164 form for `tel:` links and Resend reply addresses. */
  phoneTel: "+66991578143",
  /** Single inbox for every channel — kept as one field so it's hard to drift. */
  email: "marketing@royalphuketcity.com",
  /**
   * Aliased shape for components that read by purpose.
   * All point at the same inbox, by design.
   */
  emails: {
    reservations: "marketing@royalphuketcity.com",
    events: "marketing@royalphuketcity.com",
    press: "marketing@royalphuketcity.com",
  },
  social: {
    instagram: "https://instagram.com/twistphuket",
    facebook: "https://facebook.com/twistphuket",
    tripadvisor: "https://www.tripadvisor.com",
  },
} as const;

export const FAQS = [
  {
    q: "Where is TWIST located?",
    a: "19th Floor of the Royal Phuket City Hotel, 154 Phang Nga Road, Phuket Old Town. The express elevator from the lobby takes you straight up.",
  },
  {
    q: "What time is TWIST open?",
    a: "We open daily at 5 PM and stay open late. Kitchen serves until 23:00; the bar pours after.",
  },
  {
    q: "Is there live music every night?",
    a: "Yes — soft live music daily from 19:00 to 21:00. Louder sets and special programming on event nights (jazz, DJs, and more).",
  },
  {
    q: "Do you have a dress code?",
    a: "Smart casual. Skip the tank tops and beachwear — you came all the way up, look the part.",
  },
  {
    q: "Can I host a private event or wedding?",
    a: "Absolutely — from twelve-cover chef's tables to full venue buyouts and rooftop ceremonies. Write to marketing@royalphuketcity.com and our team will design every detail.",
  },
  {
    q: "Is TWIST family friendly?",
    a: "Families are welcome until 21:00. After that the room leans grown-up.",
  },
] as const;
