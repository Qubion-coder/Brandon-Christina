/** Values sent to Google Sheets stay in English; these map them to display text */
export const attendanceOptions = ["Joyfully accepts", "Regretfully declines"] as const;
export const guestOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests"] as const;

export const strings = {
  musicOn: "Turn music on",
  musicOff: "Turn music off",

  envelopeTitle: "The Wedding Invitation",
  openEnvelope: "Open the wedding invitation",
  touchToUnveil: "Touch to Unveil",

  groom: "Brandon",
  bride: "Christina",
  ampersand: "&",
  couple: "Brandon & Christina",

  pleaseJoinUs: "Together with their families",
  gettingMarried: "are getting married",
  groomInitial: "B",
  brideInitial: "C",
  heroWeekday: "Friday",
  heroDay: "18",
  heroMonth: "December",
  heroYear: "2026",
  scrollDown: "Scroll",
  heroPlace: "Negombo, Sri Lanka",

  groomParents: "Mr. & Mrs. De Kauwe",
  brideParents: "Mr. & Mrs. Kehelalla",
  requestHonourOfPresenceOf: "REQUEST THE HONOUR OF THE PRESENCE OF",
  toCelebrate: "TO CELEBRATE THE WEDDING OF THEIR CHILDREN",
  requestHonourOfYourPresence: "REQUEST THE HONOUR OF YOUR PRESENCE",
  belovedSonOf: "Beloved son of",
  belovedDaughterOf: "Beloved daughter of",

  theDate: "The Date",
  dateLine: "FRIDAY, 18 DEC",
  year: "2026",
  theTime: "The Time",
  timeLine: "05:00 PM - 06:30 PM",
  ceremonyPlace: "Ceremony Outdoors",
  reception: "Reception 7:00 PM - 12:00 AM",

  forever: "Forever",
  waitForThe: "Wait for the",
  magic: "magic",
  countingDown: "Counting Down",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",

  theVenue: "The Venue",
  venueName: "Ranowell Hotel",
  venueAddress: ["Chilaw Road, Kochchikade,", "Negombo."],
  venueDescription:
    "The ceremony will be held outdoors from 5:00 PM to 6:30 PM, followed by the reception at the Kings Court Banquet from 7:00 PM to midnight. We look forward to welcoming you to celebrate the wedding of Brandon and Christina.",
  getDirections: "Get Directions",
  tapToLoadMap: "Tap to load map",
  viewOnMap: "View on Map",

  willYouJoinUs: "Will You Join Us?",
  rsvpTitle: "RSVP",
  rsvpIntro: "We would be absolutely thrilled to celebrate with you. Kindly confirm your presence using the form below.",
  rsvpBy: "RSVP by 20 November 2026",
  rsvpContactTitle: "For RSVP enquiries",
  rsvpContactBrandon: "Brandon",
  rsvpContactChristina: "Christina",
  thankYou: "Thank You!",
  rsvpReceived: "Your RSVP has been successfully received.",
  fullName: "Full Name",
  fullNamePlaceholder: "John & Jane Doe",
  attendanceQuestion: "Will you be joining us for our wedding?",
  attendance: {
    "Joyfully accepts": "Joyfully accepts",
    "Regretfully declines": "Regretfully declines",
  } as Record<(typeof attendanceOptions)[number], string>,
  guestsQuestion: "How many people will be attending, as per your invitation?",
  guests: {
    "1 guest": "1 guest",
    "2 guests": "2 guests",
    "3 guests": "3 guests",
    "4 guests": "4 guests",
    "5 guests": "5 guests",
  } as Record<(typeof guestOptions)[number], string>,
  guestsHint: "Please select only the number of guests specified on your invitation.",
  guestNames: "Full names of all guests attending",
  guestNamesPlaceholder: "One name per line",
  specialMessage: "A special message for the bride and groom (optional)",
  messagePlaceholder: "Wishing you a lifetime of happiness...",
  errorMessage: "Something went wrong. Please try again.",
  sending: "Sending...",
  sendRsvp: "Send RSVP",

  goodToKnow: "Good to Know",
  faqTitle: "Questions & Answers",
  faq: [
    {
      question: "What's the RSVP deadline?",
      answer:
        "Please RSVP by 20 November 2026 so we can confirm our guest count and make the necessary arrangements.",
    },
    {
      question: "Can I bring a guest?",
      answer:
        "Unfortunately, we are unable to accommodate additional guests. Please kindly refer to your invitation, which indicates the number of guests included. Thank you for your understanding.",
    },
    {
      question: "Do you have any dietary requirements or food allergies?",
      answer:
        "Please speak with any member of the banquet staff on the day of the reception regarding any food allergies, dietary requirements, or concerns about ingredients.",
    },
    {
      question: "Who should I contact if I have questions?",
      answer:
        "If you have any questions or need further clarification, please feel free to contact the bride or groom, or any of their immediate family members. We'll be happy to assist you.",
    },
  ],

  bestWishes: "Best Wishes",
  wishesIntro:
    "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!",
  wishReceived: "Your beautiful message has been received.",
  yourName: "Your Name",
  yourNamePlaceholder: "John Doe",
  yourMessage: "Your Message",
  sendWishes: "Send Wishes",
  thankYouWatermark: "Thank You",
  withLove: "With Love",

  allRightsReserved: "All rights reserved.",
  wantWebsite: "Want a beautiful wedding website like this?",
  createYoursWith: "Create yours with",
};
