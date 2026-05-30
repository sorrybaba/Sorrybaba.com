/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from './types';

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 'e-gift-sorry-card',
    name: 'Personalized Apology E-Card',
    price: 500,
    originalPrice: 750,
    category: 'e-gift',
    subCategory: 'wife', // Default fallback
    isEGift: true,
    description: 'A cute, custom digital apology card delivered via email or WhatsApp in under 30 minutes. Features personalized names and a lovely interactive opening effect.',
    longDescription: 'Our Personalized Apology E-card is crafted to melt heartaches instantly. Built with emotional color choices and sweet cartoon characters, this digital card can be customized with your names and your personalized apology letter. Once purchased, we craft your custom interactive page and send you the link via WhatsApp/Email to share directly with your favorite person! It is optimized for mobile screens, ensuring a beautiful reading experience for them.',
    rating: 4.8,
    reviewsCount: 124,
    image: `e-card`,
    tags: ['Apology', 'E-Gift', 'New', 'Romantic'],
    specifications: [
      { name: 'Delivery Mode', value: 'WhatsApp Link & Email' },
      { name: 'Delivery Time', value: 'Under 30 Minutes' },
      { name: 'Customization', value: 'Custom Names & Apology Message' },
      { name: 'Compatibility', value: 'Responsive mobile/tablet/desktop link' }
    ],
    reviews: [
      { id: 'r1', author: 'Sajith K.', rating: 5, date: '2026-05-15', comment: 'Honestly saved me after a massive argument! My wife was smiling within seconds of opening the link.', relationship: 'Apologized to Wife' },
      { id: 'r2', author: 'Dilani A.', rating: 4, date: '2026-05-20', comment: 'Such a sweet design. Very romantic and cute.', relationship: 'Apologized to Husband' }
    ]
  },
  {
    id: 'e-gift-flower-bouquet',
    name: 'Virtual Flower Bouquet & Letter',
    price: 800,
    originalPrice: 1200,
    category: 'e-gift',
    subCategory: 'girlfriend',
    isEGift: true,
    description: 'Send an everlasting digital flower bouquet that never withers. An elegant custom interactive floral presentation with a premium background music option.',
    longDescription: 'Why send flowers that wither away in a few days when you can send an everlasting gorgeous Virtual Flower Bouquet? Perfect for romantic partners, this digital gift loads with an elegant bouquet presentation, a slow-falling petal animation, and a high-quality instrumental audio track playing in the background while your letter is unveiled. It is cute, modern, and creates an instant smile!',
    rating: 4.9,
    reviewsCount: 98,
    image: `virtual-flowers`,
    tags: ['Romantic', 'Apology', 'E-Gift', 'Popular'],
    specifications: [
      { name: 'Delivery Mode', value: 'WhatsApp Link & Email' },
      { name: 'Features', value: 'Music track, falling flowers, custom letter' },
      { name: 'Flower Selection', value: 'Virtual Red Roses & Pink Lilies' },
      { name: 'Turnaround Time', value: 'Under 30 minutes' }
    ],
    reviews: [
      { id: 'r3', author: 'Ruwan M.', rating: 5, date: '2026-05-25', comment: 'She loved the falling petal effect! Very unique way of saying sorry.', relationship: 'Apologized to Girlfriend' }
    ]
  },
  {
    id: 'e-gift-love-letter',
    name: 'Personalized Love Letter & Memory Slideshow',
    price: 1200,
    originalPrice: 1800,
    category: 'e-gift',
    subCategory: 'boyfriend',
    isEGift: true,
    description: 'An emotional e-letter format paired with a digital timeline of your favorite memories. Features animated transitions and beautiful customized design accents.',
    longDescription: 'The ultimate emotional reconciliation tool. This premium digital love letter comes paired with a slideshow timeline of your memories. You can upload up to 5 pictures (via WhatsApp coordination after ordering), and we construct a premium, fluid timeline expressing how much you treasure them. Excellent for marking anniversary milestones, birthdays, or showing profound regret.',
    rating: 5.0,
    reviewsCount: 76,
    image: `love-letter`,
    tags: ['Romantic', 'E-Gift', 'Popular', 'New', 'Anniversary'],
    specifications: [
      { name: 'Format', value: 'Interactive Webpage link' },
      { name: 'Media Supported', value: 'Up to 5 images + Custom apology statement' },
      { name: 'Interactivity', value: 'Staggered page transitions & audio track support' },
      { name: 'Validity', value: 'Lifetime hosting link' }
    ],
    reviews: [
      { id: 'r4', author: 'Nisansala H.', rating: 5, date: '2026-05-28', comment: 'This was so romantic. My boyfriend wept and immediately called me back. We are back together!', relationship: 'Apologized to Boyfriend' }
    ]
  },
  {
    id: 'physical-teddy-bear',
    name: 'Cute Apology Teddy Bear (LKR 4,500)',
    price: 4500,
    originalPrice: 5500,
    category: 'wife-husband',
    subCategory: 'wife',
    isEGift: false,
    description: 'A super soft, premium plush teddy bear holding a "Please Forgive Me, Baba" velvet embroidered heart. Perfect for physical reconnections.',
    longDescription: 'Nothing says "I love you" and "I am sorry" with quite the same warmth as a cuddly, premium Teddy Bear. This high-density soft plush bear stands at 14 inches tall, holding an elegant deep-red velvet heart embroidered with "Please Forgive Me, Baba". Designed to be extremely squeezable, it comes elegantly gift-wrapped in our signature brand-pink tissue paper and scented box to ensure a dreamy unboxing experience.',
    rating: 4.7,
    reviewsCount: 215,
    image: `teddy-bear`,
    tags: ['Romantic', 'Apology', 'Popular', 'Physical'],
    specifications: [
      { name: 'Dimensions', value: '14 Inches Height (Sitting)' },
      { name: 'Material', value: 'Hypoallergenic premium structural plush' },
      { name: 'Packaging', value: 'Scented signature box with ribbon and custom card' },
      { name: 'Delivery area', value: 'All Provinces, Sri Lanka' }
    ],
    reviews: [
      { id: 'r5', author: 'Ishara P.', rating: 5, date: '2026-05-10', comment: 'Extremely high quality! My wife literally clutched it to her chest and couldn’t stay angry.', relationship: 'Given to Wife' },
      { id: 'r6', author: 'Tharindu N.', rating: 4, date: '2026-05-18', comment: 'Scented box has an amazing aroma of fresh vanilla. The custom-typed card was a great addition.', relationship: 'Given to Girlfriend' }
    ]
  },
  {
    id: 'physical-rose-box',
    name: 'Eternal Rose Apology Box',
    price: 3500,
    originalPrice: 4200,
    category: 'girlfriend-boyfriend',
    subCategory: 'girlfriend',
    isEGift: false,
    description: 'An elegant premium box featuring 9 imported fresh velvet red roses arranged in a heart shape, with a hidden drawer for your handwritten note.',
    longDescription: 'A visual masterpiece of elegance and devotion. The Rose Apology Box contains 9 carefully selected, velvet-soft red roses configured inside a premium textured white box. Feature includes a pull-out bottom drawer where we place your custom apologize scroll, hand-rolled with a cute pink wax stamp. Perfect for immediate tactile romantic forgiveness.',
    rating: 4.9,
    reviewsCount: 162,
    image: `rose-box`,
    tags: ['Romantic', 'Apology', 'New', 'Physical'],
    specifications: [
      { name: 'Rose Count', value: '9 Imported Red Velvet Roses' },
      { name: 'Box Dimension', value: '6in x 6in x 6in' },
      { name: 'Drawer Content', value: 'Wax-sealed custom text scroll' },
      { name: 'Shelf Life', value: 'Hydro-treated for extended freshness (7-10 days)' }
    ],
    reviews: [
      { id: 'r7', author: 'Kavindu D.', rating: 5, date: '2026-05-22', comment: 'The wax seal on the scroll looks unbelievably premium. Best LKR 3500 I have ever spent.', relationship: 'Given to Girlfriend' }
    ]
  },
  {
    id: 'physical-memory-frame',
    name: 'Couple Memory Custom Glowing Frame',
    price: 5000,
    originalPrice: 6500,
    category: 'other',
    subCategory: 'women',
    isEGift: false,
    description: 'A glowing warm-white LED acrylic memory block customized with your favorite couple image and a barcode playing your special song.',
    longDescription: 'Transform a single beautiful photograph into a glowing piece of home decor. This custom memory frame is made of high-grade transparent acrylic set on a natural beechwood base. Equipped with pre-installed warm LED lights, it shines gentle ambient light through your custom-engraved couple photo. Simply send us your photo over WhatsApp, and we assemble the block with a custom Spotify/audio QR code that leads directly to your favorite couple tune.',
    rating: 4.6,
    reviewsCount: 88,
    image: `memory-frame`,
    tags: ['Anniversary', 'Romantic', 'Popular', 'Physical', 'Birthday'],
    specifications: [
      { name: 'Frame Material', value: 'High-optical-clarity structural acrylic' },
      { name: 'Base Material', value: 'Solid premium European Beechwood' },
      { name: 'Lighting Source', value: 'Interlocking LED warm strips with USB toggle switch' },
      { name: 'Turnaround Time', value: '2-3 Business days for assembly' }
    ],
    reviews: [
      { id: 'r8', author: 'Priyantha L.', rating: 5, date: '2026-05-26', comment: 'The lighting is so warm and cozy. My husband keeps it on his nightstand every night.', relationship: 'Given to Husband' }
    ]
  },
  // Extra products to enrich the layout!
  {
    id: 'physical-gentle-wristlet',
    name: 'The "Connect Again" Couples Bracelet Set',
    price: 2800,
    originalPrice: 3500,
    category: 'girlfriend-boyfriend',
    subCategory: 'boyfriend',
    isEGift: false,
    description: 'Matching magnetic stainless-steel rope bracelets with custom-carved initials, connecting together with a subtle click when hands are held.',
    longDescription: 'An elegant and humble symbol of physical attraction and connection. These bracelets are made of high-quality, sweatproof nylon braided rope and equipped with a micro-magnetic clasp that snaps together instantly when your hands meet. Designed to resemble a continuous lifeline, they represent your commitment to stay in sync no matter what.',
    rating: 4.5,
    reviewsCount: 61,
    image: `magnetic-bracelets`,
    tags: ['Romantic', 'Anniversary', 'Physical', 'New'],
    specifications: [
      { name: 'Metals', value: '316L Surgical-Grade Anti-Tarnish Stainless Steel' },
      { name: 'Rope Style', value: 'Durable self-adjusting premium military rope' },
      { name: 'Connection Clasp', value: 'Polished neodymium rare-earth micro-magnets' },
      { name: 'Initial carvings', value: 'A to Z available (coordinated post-order)' }
    ],
    reviews: [
      { id: 'r9', author: 'Madushika T.', rating: 4, date: '2026-05-19', comment: 'Simple, neat, and highly emotional. boyfriend wears it everywhere.', relationship: 'Given to Boyfriend' }
    ]
  },
  {
    id: 'physical-matching-mugs',
    name: 'Huggy Couples Ceramic Mug Set',
    price: 3200,
    originalPrice: 4000,
    category: 'wife-husband',
    subCategory: 'husband',
    isEGift: false,
    description: 'Cute interlocking ceramic mugs shaped like they are hugging. Comes with hand-painted facial features and gold paint accents.',
    longDescription: 'These beautiful, whimsical mugs are hand-poured from stoneware clay and shaped to slide into one another as a sweet, warm visual hug. One mug represents a blushful character; the other holds space with arms wrapped around. They remind you to start every morning together with a warm beverage and a giant hug.',
    rating: 4.8,
    reviewsCount: 94,
    image: `mugs-set`,
    tags: ['Birthday', 'Romantic', 'Physical', 'Popular'],
    specifications: [
      { name: 'Material', value: 'Double-fired premium grade food-safe stoneware' },
      { name: 'Capacity', value: '350ml Per Mug' },
      { name: 'Design', value: 'Anti-slip base with interlocking ergonomic design' },
      { name: 'Care Instructions', value: 'Dishwasher and Microwave safe' }
    ],
    reviews: [
      { id: 'r10', author: 'Hasini J.', rating: 5, date: '2026-05-24', comment: 'Perfect gift for making coffee dates sweet again. They sit perfectly together.', relationship: 'Given to Husband' }
    ]
  },
  {
    id: 'physical-perfume-pouch',
    name: 'Sweet Harmony Scented Apology Pouch',
    price: 3900,
    originalPrice: 4800,
    category: 'other',
    subCategory: 'men',
    isEGift: false,
    description: 'A comforting organic sensory set comprising an artisan lavender pillow mist, a natural beeswax candle, and a lavender oil roller-ball.',
    longDescription: 'Arguments can leave people feeling stressed, restless, and tired. Guide your special person back to an ultimate state of peace and calm with our sensory scent pouch. Specially compiled with calming sleep-inducing lavender mist and oils, this natural aroma blend relaxes muscle tension and clears ambient negativity, setting the stage for calm conversations.',
    rating: 4.7,
    reviewsCount: 42,
    image: `aromatherapy`,
    tags: ['Apology', 'Anniversary', 'Physical', 'New'],
    specifications: [
      { name: 'Pouch Material', value: '100% Organic natural linen with pink drawstring' },
      { name: 'Candle Burn', value: '25 Hours clean-burning soywax' },
      { name: 'Oil Blend', value: 'Pure therapeutic grade French Lavender and Kamila' },
      { name: 'Packaging', value: 'Scent-sealed environment-friendly cotton casing' }
    ],
    reviews: [
      { id: 'r11', author: 'Imesh D.', rating: 5, date: '2026-05-29', comment: 'Smells heavenly! It immediately calmed our room after a stressful day.', relationship: 'Given to Family Member' }
    ]
  }
];

export const CATEGORY_METADATA = {
  'wife-husband': {
    title: 'Wife & Husband Gifts',
    subtitle: 'Re-ignite the sacred spark and rebuild your sweet marital bond.',
    tags: ['Wife', 'Husband']
  },
  'girlfriend-boyfriend': {
    title: 'Girlfriend & Boyfriend Gifts',
    subtitle: 'Show them how deeply you care and restore your sweet partnership.',
    tags: ['Girlfriend', 'Boyfriend']
  },
  'other': {
    title: 'Other Warm Apology Gifts',
    subtitle: 'Bring warm smiles back to friends, family, and loved ones.',
    tags: ['Women', 'Men']
  }
};

export const FAQ_ITEMS = [
  {
    question: 'How fast are the digital E-Gifts created and delivered?',
    answer: 'Extremely fast! Our digital E-Gifts (Interactive Apology Cards, Love Letters, and Flower Bouquets) are finalized by our design team and sent directly to your email or WhatsApp in under 30 minutes. You can share them safely with your partner immediately!'
  },
  {
    question: 'How does the WhatsApp order system work?',
    answer: 'Once you fill out your shipping and message details on our Checkout page and click "Submit Order via WhatsApp", our system automatically prepares a beautifully formatted invoice text and opens WhatsApp. It redirects you to send this information directly to us, where our friendly concierge confirms payment details and handles everything!'
  },
  {
    question: 'What are the delivery charges for physical gifts in Sri Lanka?',
    answer: 'We charge a flat rate of LKR 350 for home deliveries across any province in Sri Lanka. Standard delivery times are 1-2 days within Colombo/suburbs and 2-3 days for outstation areas.'
  },
  {
    question: 'Can I add a custom card with a physical gift?',
    answer: 'Absolutely! Every single physical gift from SorryBaba.com comes with our complimentary signature pink apology card. We can print your custom apology message on it. You can write your heart out in the checkout form!'
  },
  {
    question: 'Are my digital letters and uploaded pictures secure?',
    answer: 'Yes! All digital pages generated on SorryBaba.com are private. Only people who have the unique, secure link can access them. We never list your private notes or images on search engines.'
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We support Cash On Delivery (for physical products), Direct Bank Transfer, and secure mobile payments coordinated directly with our support team over WhatsApp.'
  }
];
