export type Lang = "en" | "si";

/** Values sent to Google Sheets stay in English; these map them to display text */
export const attendanceOptions = ["Joyfully accepts", "Regretfully declines"] as const;
export const guestOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests"] as const;

const en = {
  langToggle: "සිංහල",
  langToggleLabel: "සිංහලෙන් බලන්න",
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

export type Strings = typeof en;

const si: Strings = {
  langToggle: "English",
  langToggleLabel: "View in English",
  musicOn: "සංගීතය ක්‍රියාත්මක කරන්න",
  musicOff: "සංගීතය නවත්වන්න",

  envelopeTitle: "විවාහ මංගල ආරාධනය",
  openEnvelope: "විවාහ ආරාධනය විවෘත කරන්න",
  touchToUnveil: "විවෘත කිරීමට ස්පර්ශ කරන්න",

  groom: "බ්‍රැන්ඩන්",
  bride: "ක්‍රිස්ටිනා",
  ampersand: "සහ",
  couple: "බ්‍රැන්ඩන් සහ ක්‍රිස්ටිනා",

  pleaseJoinUs: "පවුල් දෙකේ ආශිර්වාදය ඇතිව",
  gettingMarried: "විවාහ දිවියට එළඹෙති",
  groomInitial: "බ්‍රැ",
  brideInitial: "ක්‍රි",
  heroWeekday: "සිකුරාදා",
  heroDay: "18",
  heroMonth: "දෙසැම්බර්",
  heroYear: "2026",
  scrollDown: "පහළට",
  heroPlace: "මීගමුව, ශ්‍රී ලංකාව",

  groomParents: "ද කවුවේ මහතා සහ මහත්මිය",
  brideParents: "කෙහෙලැල්ල මහතා සහ මහත්මිය",
  requestHonourOfPresenceOf: "තම දරුවන්ගේ විවාහ මංගල්‍යය සැමරීමට",
  toCelebrate: "ඔබගේ සහභාගීත්වය ගෞරවයෙන් ඉල්ලා සිටිති",
  requestHonourOfYourPresence: "තම දරුවන්ගේ විවාහ මංගල්‍යය සැමරීමට ඔබගේ සහභාගීත්වය ගෞරවයෙන් ඉල්ලා සිටිති",
  belovedSonOf: "ආදරණීය පුත්‍රයා",
  belovedDaughterOf: "ආදරණීය දියණිය",

  theDate: "දිනය",
  dateLine: "දෙසැම්බර් 18, සිකුරාදා",
  year: "2026",
  theTime: "වේලාව",
  timeLine: "ප.ව. 5:00 - ප.ව. 6:30",
  ceremonyPlace: "මංගල උත්සවය එළිමහනේදී",
  reception: "සාදය ප.ව. 7:00 - මධ්‍යම රාත්‍රී 12:00",

  forever: "සදාකල්",
  waitForThe: "ඒ සොඳුරු",
  magic: "මොහොත එනතුරු",
  countingDown: "කාලය ගණන් කරමින්",
  days: "දින",
  hours: "පැය",
  minutes: "මිනිත්තු",
  seconds: "තත්පර",

  theVenue: "උත්සව ස්ථානය",
  venueName: "රනෝවෙල් හෝටලය",
  venueAddress: ["හලාවත පාර, කොච්චිකඩේ,", "මීගමුව."],
  venueDescription:
    "මංගල උත්සවය ප.ව. 5:00 සිට 6:30 දක්වා එළිමහනේදී පැවැත්වෙන අතර, අනතුරුව ප.ව. 7:00 සිට මධ්‍යම රාත්‍රිය දක්වා කිංග්ස් කෝට් භෝජන ශාලාවේදී සාදය පැවැත්වේ. බ්‍රැන්ඩන් සහ ක්‍රිස්ටිනාගේ විවාහ මංගල්‍යය සැමරීමට ඔබව සාදරයෙන් පිළිගැනීමට අපි බලාපොරොත්තු වෙමු.",
  getDirections: "මග පෙන්වීම",
  tapToLoadMap: "සිතියම බැලීමට තට්ටු කරන්න",
  viewOnMap: "සිතියමෙන් බලන්න",

  willYouJoinUs: "ඔබ අප හා එක්වනවාද?",
  rsvpTitle: "පැමිණීම තහවුරු කරන්න",
  rsvpIntro: "ඔබ සමඟ මෙම සතුට බෙදාගැනීමට අපි ඉතා කැමැත්තෙමු. කරුණාකර පහත පෝරමය මඟින් ඔබගේ පැමිණීම තහවුරු කරන්න.",
  rsvpBy: "2026 නොවැම්බර් 20 ට පෙර තහවුරු කරන්න",
  rsvpContactTitle: "RSVP විමසීම් සඳහා",
  rsvpContactBrandon: "බ්‍රැන්ඩන්",
  rsvpContactChristina: "ක්‍රිස්ටිනා",
  thankYou: "ස්තූතියි!",
  rsvpReceived: "ඔබගේ ප්‍රතිචාරය සාර්ථකව ලැබුණි.",
  fullName: "සම්පූර්ණ නම",
  fullNamePlaceholder: "ඔබගේ නම",
  attendanceQuestion: "ඔබ අපගේ විවාහ මංගල්‍යයට සහභාගී වන්නේද?",
  attendance: {
    "Joyfully accepts": "සතුටින් සහභාගී වෙමි",
    "Regretfully declines": "කණගාටුවෙන් සහභාගී නොවෙමි",
  },
  guestsQuestion: "ඔබගේ ආරාධනාවට අනුව සහභාගී වන අමුත්තන් ගණන කීයද?",
  guests: {
    "1 guest": "අමුත්තන් 1",
    "2 guests": "අමුත්තන් 2",
    "3 guests": "අමුත්තන් 3",
    "4 guests": "අමුත්තන් 4",
    "5 guests": "අමුත්තන් 5",
  },
  guestsHint: "කරුණාකර ඔබගේ ආරාධනාවේ සඳහන් අමුත්තන් ගණන පමණක් තෝරන්න.",
  guestNames: "සහභාගී වන සියලු අමුත්තන්ගේ සම්පූර්ණ නම්",
  guestNamesPlaceholder: "පේළියකට එක් නමක් බැගින්",
  specialMessage: "මනාලයාට සහ මනාලියට විශේෂ පණිවිඩයක් (අත්‍යවශ්‍ය නොවේ)",
  messagePlaceholder: "ඔබ දෙදෙනාට සදාකාලික සතුට පතමු...",
  errorMessage: "යමක් වැරදී ඇත. කරුණාකර නැවත උත්සාහ කරන්න.",
  sending: "යවමින්...",
  sendRsvp: "ප්‍රතිචාරය යවන්න",

  goodToKnow: "දැනගත යුතු දේ",
  faqTitle: "ප්‍රශ්න සහ පිළිතුරු",
  faq: [
    {
      question: "පැමිණීම තහවුරු කිරීමේ අවසන් දිනය කුමක්ද?",
      answer:
        "අමුත්තන් ගණන තහවුරු කර අවශ්‍ය කටයුතු සූදානම් කිරීම සඳහා කරුණාකර 2026 නොවැම්බර් 20 ට පෙර ඔබගේ පැමිණීම තහවුරු කරන්න.",
    },
    {
      question: "මට අමුත්තෙකු රැගෙන ආ හැකිද?",
      answer:
        "කණගාටුයි, අමතර අමුත්තන්ට ඉඩ ලබාදීමට අපට නොහැක. ඔබගේ ආරාධනාවේ සඳහන් අමුත්තන් ගණන කරුණාකර බලන්න. ඔබගේ අවබෝධයට ස්තූතියි.",
    },
    {
      question: "ඔබට කිසියම් ආහාර අවශ්‍යතා හෝ ආහාර අසාත්මිකතා තිබේද?",
      answer:
        "ආහාර අසාත්මිකතා, ආහාර අවශ්‍යතා හෝ ආහාරවල අඩංගු ද්‍රව්‍ය පිළිබඳ කිසියම් ගැටලුවක් ඇත්නම්, සාදය පැවැත්වෙන දින භෝජන ශාලාවේ කාර්ය මණ්ඩලයේ ඕනෑම සාමාජිකයෙකු සමඟ කතා කරන්න.",
    },
    {
      question: "ප්‍රශ්න ඇත්නම් මා සම්බන්ධ කරගත යුත්තේ කාවද?",
      answer:
        "ඔබට කිසියම් ප්‍රශ්නයක් හෝ වැඩිදුර පැහැදිලි කිරීමක් අවශ්‍ය නම්, මනාලයා, මනාලිය හෝ ඔවුන්ගේ සමීප පවුලේ ඕනෑම සාමාජිකයෙකු සම්බන්ධ කරගන්න. ඔබට සහාය වීමට අපි සතුටු වෙමු.",
    },
  ],

  bestWishes: "සුබ පැතුම්",
  wishesIntro:
    "අපගේ විවාහ මංගල්‍යයට ඔබගේ පැමිණීමම අපට ලැබෙන විශාලතම තෑග්ගයි. එසේ වුවද, ඔබ අපට පණිවිඩයකින් ආශිර්වාද කිරීමට කැමති නම්, එය කියවීමට අපි සතුටු වෙමු!",
  wishReceived: "ඔබගේ සුන්දර පණිවිඩය ලැබුණි.",
  yourName: "ඔබගේ නම",
  yourNamePlaceholder: "ඔබගේ නම",
  yourMessage: "ඔබගේ පණිවිඩය",
  sendWishes: "සුබ පැතුම් යවන්න",
  thankYouWatermark: "ස්තූතියි",
  withLove: "ආදරයෙන්",

  allRightsReserved: "සියලු හිමිකම් ඇවිරිණි.",
  wantWebsite: "මෙවැනි සුන්දර විවාහ වෙබ් අඩවියක් අවශ්‍යද?",
  createYoursWith: "ඔබගේම එකක් සාදාගන්න:",
};

export const translations: Record<Lang, Strings> = { en, si };

const storageKey = "invite-lang";

export function loadLang(): Lang {
  try {
    return localStorage.getItem(storageKey) === "si" ? "si" : "en";
  } catch {
    return "en";
  }
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(storageKey, lang);
  } catch {
    // Storage can be blocked (private mode); the choice just won't persist
  }
}
