import { IMG } from "@/lib/images";

/* ----------------------------------------------------------------------------
 * TWIST · Food menu
 * Source of truth: TWIST official printed menu (Version 5 · 24/08/01)
 * Prices in THB, subject to 10% service charge + 7% VAT.
 * `recommended: true` mirrors the thumbs-up marker on the printed menu.
 * -------------------------------------------------------------------------- */

export type MenuItem = {
  name: string;
  notes: string;
  price: string;
  recommended?: boolean;
};

export type MenuSection = {
  section: string;
  items: MenuItem[];
};

/** TWISTED PERANAKAN — front-page signature collection. */
export const PERANAKAN_SIGNATURES: MenuSection = {
  section: "Twisted Peranakan",
  items: [
    {
      name: "Crispy Pork Skin Fried Rice",
      notes: "Wok-fried jasmine rice · crispy pork · Kikkoman sauce",
      price: "250",
    },
    {
      name: "YaYa Roasted Chicken",
      notes: "Roasted chicken thigh · Asian spice · YaYa mild curry sauce",
      price: "340",
    },
    {
      name: "Pan-Fried Pork Chop",
      notes: "Pan-fried pork chop · fried garlic · dried chilli",
      price: "450",
    },
    {
      name: "Seafood Fried Rice",
      notes: "Stir-fried jasmine rice · blue river prawn · seafood",
      price: "480",
    },
    {
      name: "Grilled Snapper Fillet, Curry Sauce",
      notes: "Grilled spicy sea bass · lemon potatoes · red curry sauce",
      price: "510",
      recommended: true,
    },
    {
      name: "Baba Sea Scallop, Herbarium Rice Salad",
      notes: "Baba Phuket rice salad · sea scallop · salami",
      price: "530",
    },
    {
      name: "Deep Crispy Fried Grouper Fillet",
      notes: "Deep-fried grouper fillet · red thick curry",
      price: "550",
    },
    {
      name: "Baba Pan-Shallow Fried Salmon Fillet",
      notes: "Pan-fried salmon · Phuket herbal curry · mixed vegetable",
      price: "570",
    },
    {
      name: "Grilled Andaman Sea Prawns",
      notes: "Grilled Andaman prawns · sambal sauce",
      price: "650",
    },
    {
      name: "Grilled Rack of Lamb",
      notes: "Grilled rack of lamb · Phuket all-spice flavour",
      price: "1,100",
      recommended: true,
    },
  ],
};

/** Full à-la-carte menu by section. */
export const KITCHEN: MenuSection[] = [
  {
    section: "Appetizer",
    items: [
      { name: "Mexican Corn on the Cob", notes: "Sour mayo · crispy bacon", price: "150" },
      { name: "Rocket Salad", notes: "Maple & brown sugar bacon · balsamic dressing", price: "210" },
      { name: "Peranakan Salad", notes: "Warmed sesame dried squid · smoked shrimps · skewer", price: "250" },
      { name: "Crispy Calamari Rings", notes: "Deep-fried curry calamari · tartare sauce", price: "280" },
      { name: "Massaman Curry Nacho", notes: "With beef or chicken", price: "280" },
      { name: "Peranakan Spring Roll", notes: "Crispy prawns · cashew nut · coriander dip", price: "290", recommended: true },
      { name: "Braised Pork Belly Tempura", notes: "Pork belly fritter · kimchi · spicy chilli sauce", price: "320" },
      { name: "Caesar Salad with Smoked Duck", notes: "Classic Caesar · smoked duck bread", price: "320" },
      { name: "Seared Saku Tuna Futomaki", notes: "Saku tuna futo-maki · wasabi cream sauce", price: "320" },
      { name: "Mild Crab Meat Curry", notes: "Mild crab curry · small rice noodle", price: "550", recommended: true },
    ],
  },
  {
    section: "Soup",
    items: [
      { name: "Peranakan Vegetable Soup", notes: "Mixed vegetable cream · garlic bread", price: "210" },
      { name: "Mushroom Cream Soup", notes: "Mushroom cream · pesto bread", price: "230" },
      { name: "Spicy Prawns Soup (Tom Yum Goong)", notes: "Thai prawns soup · fresh coconut · lemongrass", price: "290" },
    ],
  },
  {
    section: "Main Course",
    items: [
      { name: "Deep-Fried Chicken in the Basket", notes: "Sweet chilli · coriander sauce", price: "320" },
      { name: "Pork Chop, Black Pepper Sauce", notes: "Mustard potatoes · caramelised green apple", price: "460" },
      { name: "Grilled Snapper Fillet, Cajun Spice", notes: "Lemon cream · mash · shoestring potatoes", price: "510" },
      { name: "Crispy German Pork Knuckle", notes: "Sauerkraut · condiments", price: "650" },
      { name: "Grilled Tiger Prawns", notes: "Spicy coriander · potatoes au gratin · greens", price: "670" },
      { name: "Pan-Seared North Atlantic Snow Fish", notes: "Vegetable ratatouille · citrus rocket · tomato sauce", price: "870" },
      { name: "Rack of Lamb, Mint Sauce", notes: "Mediterranean black lentil · mint · grilled potatoes", price: "1,070" },
      { name: "Australian Beef Striploin Steak", notes: "Mexican corn salsa · spicy potato · yolk pepper", price: "1,150" },
      { name: "Australian Beef Tenderloin Steak", notes: "Mashed potatoes · asparagus · blue cheese · red wine", price: "1,250", recommended: true },
    ],
  },
  {
    section: "Pasta",
    items: [
      { name: "Spaghetti Carbonara", notes: "Spaghetti carbonara · chicken or crispy bacon", price: "340" },
      { name: "Sea Scallop Spinach Pesto Spaghetti", notes: "Creamy pesto spaghetti · seared scallop", price: "350" },
      { name: "Bolognese Penne Tenderloin", notes: "Penne · tenderloin bolognese · pesto bread", price: "380" },
    ],
  },
  {
    section: "Between the Buns",
    items: [
      { name: "Tuna Sandwich", notes: "Focaccia · tuna · rocket salad", price: "260" },
      { name: "YaYa Club Sandwich", notes: "Fried egg · bacon · grilled chicken · iceberg · fries", price: "380" },
      { name: "Australian Wagyu Beef Burger", notes: "Wagyu · fried egg · cheese · tomato · lettuce · BBQ pineapple", price: "390" },
    ],
  },
  {
    section: "Dessert",
    items: [
      { name: "Ice Cream", notes: "Chocolate · coconut · vanilla", price: "195" },
      { name: "O-Aew & Warmed Black Sticky Rice", notes: "With coconut ice cream", price: "210" },
      { name: "Blueberry Cheesecake", notes: "With vanilla ice cream", price: "210" },
      { name: "Warmed Banana & Coconut Tart", notes: "House-made · served warm", price: "220" },
      { name: "Seasonal Fresh Fruit Platter", notes: "Assorted seasonal fruit", price: "240" },
    ],
  },
  {
    section: "Snacks",
    items: [
      { name: "French Fries", notes: "Regular or Mexican", price: "180" },
      { name: "Fried Chicken Tendons", notes: "Crispy fried tendons", price: "200" },
      { name: "Chicken Nuggets", notes: "House nuggets", price: "210" },
      { name: "Chicken Satays", notes: "Grilled chicken satays · peanut sauce", price: "230" },
      { name: "Marble Dried Beef", notes: "Thai-style dried beef", price: "240" },
      { name: "Herbal Fried Chicken Wings", notes: "Crispy herbal wings", price: "240" },
      { name: "Fried Chicken Wings, Fish Sauce", notes: "Wings tossed in fish sauce glaze", price: "240" },
      { name: "Deep-Fried Pork Collar", notes: "Crispy pork collar", price: "280" },
      { name: "Cheese Fries", notes: "Fries · melted cheese", price: "320" },
      { name: "Twist Tango Salad", notes: "House salad · spicy dressing", price: "320" },
      { name: "Spicy Grilled Beef Salad", notes: "Grilled beef · Thai spicy salad", price: "400" },
    ],
  },
];

/** Sides + footnotes from the printed menu. */
export const MENU_FOOTNOTES = {
  rice: { name: "Steamed Jasmine Rice", note: "1 portion · sharing bowl of 4 portions", priceLabel: "50 / 150" },
  legal:
    "Please let us know if you have any allergies or dietary requirements. Prices are in Thai Baht and subject to a 10% service charge and 7% VAT.",
  version: "Menu version 5 · 24/08/01",
};

/* ---------------- COCKTAILS (signature bar list) ---------------- */
export const COCKTAILS = [
  { n: "01", name: "Old Town Mule",    notes: "Ginger · Galangal · Lime · Smoke",          price: "420", tag: "SIGNATURE", img: IMG.cocktail3 },
  { n: "02", name: "Phuket Sunset",    notes: "Butterfly Pea · Passion Fruit · Aged Rum",  price: "450", tag: "HOUSE",     img: IMG.cocktail1 },
  { n: "03", name: "Andaman Negroni",  notes: "Campari · Makrut · Cold Brew · Orange",     price: "480", tag: "BARREL",    img: IMG.cocktail2 },
  { n: "04", name: "Nineteen Martini", notes: "London Dry · Lemongrass · Sea Salt",        price: "460", tag: "DRY",       img: IMG.cocktail4 },
  { n: "05", name: "Golden Hour",      notes: "Mezcal · Pineapple · Chili · Honey",        price: "470", tag: "SMOKE",     img: IMG.cocktail5 },
  { n: "06", name: "Moonlit Basil",    notes: "Gin · Basil · Cucumber · Elderflower",      price: "430", tag: "GARDEN",    img: IMG.cocktail6 },
] as const;
