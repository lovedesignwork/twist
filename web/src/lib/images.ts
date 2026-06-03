/**
 * Image URLs for the site.
 * ALL images are served from /public/imagessss/ — no external CDN dependencies.
 */

/** TWIST Rooftop series: /public/imagessss/TWIST Rooftop NNN.jpg */
const twist = (n: string) =>
  `/imagessss/${encodeURIComponent(`TWIST Rooftop ${n}.jpg`)}`;

/** Restaurant & Bar Gallery series: /public/imagessss/TWIST Restaurant & Bar Gallery N.jpg */
const gallery = (n: string) =>
  `/imagessss/${encodeURIComponent(`TWIST Restaurant & Bar Gallery ${n}.jpg`)}`;

/** Venue / portrait series: /public/imagessss/Twist # (NNN).jpg */
const venue = (n: string) =>
  `/imagessss/${encodeURIComponent(`Twist # (${n}).jpg`)}`;

/** Arbitrary filename under /public/imagessss/. */
const twistFile = (filename: string) =>
  `/imagessss/${encodeURIComponent(filename)}`;

export const IMG = {
  // ------ HERO / SKYLINE ------
  heroSkyline:    venue("149"),      // Twist # (149)  — hero: Old Town panorama
  heroPanorama:   twist("008"),      // Rooftop 008    — wide city panorama
  cityNight:      twist("006"),      // Rooftop 006    — city at night
  fullMoon:       twist("018"),      // Rooftop 018    — full-moon night shot
  goldenHour:     twist("016"),      // Rooftop 016    — golden-hour sunset

  // ------ ROOFTOP / VENUE ------
  rooftopBar:     twist("025"),      // Rooftop 025    — main bar counter
  rooftopLounge:  twist("005"),      // Rooftop 005    — lounge seating
  loungeInterior: twist("012"),      // Rooftop 012    — interior lounge
  diningRoom:     twist("001"),      // Rooftop 001    — dining room overview
  candlelitTable: gallery("4"),      // Gallery 4      — candlelit dinner table

  // ------ BAR ------
  barCounter:     twist("009"),      // Rooftop 009    — bar counter close-up
  cocktail1:      twist("024"),      // Rooftop 024    — cocktail serve
  cocktail2:      gallery("8"),      // Gallery 8      — cocktail detail
  cocktail3:      twist("044"),      // Rooftop 044    — cocktail 3
  cocktail4:      venue("100"),      // Twist # (100)  — cocktail 4
  cocktail5:      gallery("12"),     // Gallery 12     — garnish detail
  cocktail6:      gallery("13"),     // Gallery 13     — cocktail 6
  bartenderPour:  gallery("6"),      // Gallery 6      — bartender pouring

  // ------ KITCHEN / FOOD ------
  blackCod:       twist("045"),      // Rooftop 045    — black cod dish
  platingDetail:  gallery("3"),      // Gallery 3      — plating detail
  chefAtPass:     gallery("14"),     // Gallery 14     — chef at pass
  prawns:         gallery("5"),      // Gallery 5      — prawns / seafood
  burrata:        gallery("7"),      // Gallery 7      — burrata / salad
  tataki:         gallery("15"),     // Gallery 15     — tataki / sashimi
  wagyu:          gallery("16"),     // Gallery 16     — wagyu / mains
  lamb:           gallery("18"),     // Gallery 18     — lamb / mains
  sticky:         gallery("22"),     // Gallery 22     — mango sticky rice
  passion:        gallery("24"),     // Gallery 24     — passion fruit dessert
  chocSkyline:    gallery("25"),     // Gallery 25     — chocolate dessert
  botanicals:     gallery("26"),     // Gallery 26     — botanical garnish
  prawnsBig:      gallery("28"),     // Gallery 28     — large prawns platter

  // ------ EVENTS ------
  jazzNight:      twist("013"),      // Rooftop 013    — live music / jazz set
  djSet:          twist("020"),      // Rooftop 020    — DJ / party night
  weddingRooftop: twist("019"),      // Rooftop 019    — wedding rooftop
  privateDining:  twist("014"),      // Rooftop 014    — private dining setup
  livePerformance:twist("022"),      // Rooftop 022    — live performance
  pridePartyRoof: venue("158"),      // Twist # (158)  — rooftop party/pride

  // ------ JOURNAL / LIFESTYLE ------
  weddingFeature: "/imagessss/ktik-wedding.png",  // K'Tik wedding photo
  reviewSunset:   "/imagessss/TWIST_sunset.png",  // Sunset review photo
  pridePartyArticle: venue("160"),   // Twist # (160)  — pride party article
  rooftopSunrise: venue("106"),      // Twist # (106)  — sunrise
  venuePortrait1: venue("126"),      // Twist # (126)
  venuePortrait2: venue("128"),      // Twist # (128)
  venuePortrait3: venue("162"),      // Twist # (162)
  venuePortrait4: venue("163"),      // Twist # (163)

  // ------ EXTRA ROOFTOP (public only) ------
  rooftop011:     twist("011"),      // Rooftop 011
  rooftop017:     twist("017"),      // Rooftop 017
  rooftop042:     twist("042"),      // Rooftop 042
} as const;

export type ImgKey = keyof typeof IMG;
