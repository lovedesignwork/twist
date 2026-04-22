/**
 * Curated Unsplash placeholder URLs.
 *
 * Once the client provides real photos, drop them in /public/photos/...
 * and replace the URLs here. Components import by `key` so we only edit
 * one file when swapping.
 */

const u = (id: string, w = 1600, q = 80) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const IMG = {
  // ------ HERO / SKYLINE ------
  heroSkyline: u("1551918120-9739cb430c6d", 2000),         // city sunset
  heroPanorama: u("1519046904884-53103b34b206", 2200),     // tropical city
  cityNight: u("1500530855697-b586d89ba3ee", 2000),        // city night
  fullMoon: u("1532968961962-8a0cb3a2d4f5", 1400),         // moon

  // ------ ROOFTOP / VENUE ------
  rooftopBar: u("1514933651103-005eec06c04b", 1600),       // rooftop bar
  rooftopLounge: u("1559329007-40df8a9345d8", 1600),       // lounge
  loungeInterior: u("1517248135467-4c7edcad34c4", 1600),   // restaurant interior
  diningRoom: u("1559339352-11d035aa65de", 1600),          // dining room
  candlelitTable: u("1414235077428-338989a2e8c0", 1600),   // candlelit dinner

  // ------ COCKTAILS / BAR ------
  cocktail1: u("1551538827-9c037cb4f32a", 1200),           // cocktail garnish
  cocktail2: u("1514362545857-3bc16c4c7d1b", 1200),        // negroni
  cocktail3: u("1572116469696-31de0f17cc34", 1200),        // mule cup
  cocktail4: u("1536935338788-846bb9981813", 1200),        // martini
  cocktail5: u("1568107036517-d6e2cf6c92ec", 1200),        // smoked drink
  cocktail6: u("1470337458703-46ad1756a187", 1200),        // gin garden
  bartenderPour: u("1551024601-bec78aea704b", 1400),       // bartender
  barCounter: u("1572116469696-31de0f17cc34", 1600),       // bar counter

  // ------ KITCHEN / FOOD ------
  blackCod: u("1546833999-b9f581a1996d", 1200),            // miso fish
  prawns: u("1559847844-5315695dadae", 1200),              // prawns
  burrata: u("1565958011703-44f9829ba187", 1200),          // burrata
  tataki: u("1553621042-f6e147245754", 1200),              // tuna tataki
  wagyu: u("1546833998-877b37c3e5a6", 1200),               // wagyu
  lamb: u("1544025162-d76694265947", 1200),                // lamb shank
  sticky: u("1565299585323-38d6b0865b47", 1200),           // mango sticky rice
  passion: u("1488477181946-6428a0291777", 1200),          // tart
  chocSkyline: u("1551024506-0bccd828d307", 1200),         // chocolate dessert
  platingDetail: u("1559339352-11d035aa65de", 1200),       // plating

  // ------ EVENTS ------
  jazzNight: u("1493225457124-a3eb161ffa5f", 1600),        // jazz band stage
  djSet: u("1571266028243-d220c6a45cda", 1600),            // dj
  weddingRooftop: u("1519225421980-715cb0215aed", 1600),   // wedding ceremony
  privateDining: u("1414235077428-338989a2e8c0", 1600),    // private dining
  livePerformance: u("1493225457124-a3eb161ffa5f", 1600),  // live music
  pridePartyRoof: u("1514933651103-005eec06c04b", 1600),   // rooftop crowd

  // ------ JOURNAL / LIFESTYLE ------
  weddingFeature: u("1519741497674-611481863552", 1600),   // wedding feature
  goldenHour: u("1493558103817-58b2924bce98", 1600),       // golden hour
  chefAtPass: u("1556910103-1c02745aae4d", 1200),          // chef
  botanicals: u("1470337458703-46ad1756a187", 1200),       // botanicals
  pridePartyArticle: u("1518707399486-6d702f84bf3a", 1200),// pride
  reviewSunset: u("1551918120-9739cb430c6d", 1200),        // sunset
} as const;

export type ImgKey = keyof typeof IMG;
