import { ServiceItem, CaseStudyItem, AuditQuestion, AgencyLeader } from '../types';
import heroImg from '../assets/images/hero_agency_ormoc_1791167368030.jpg';
import cafeImg from '../assets/images/case_study_cafe_1791167383697.jpg';
import productImg from '../assets/images/case_study_product_1791167396742.jpg';
import resortImg from '../assets/images/case_study_resort_1791167408245.jpg';

export const HERO_IMAGE = heroImg || '/images/hero_agency_ormoc_1791167368030.jpg';

export const AGENCY_STATS = [
  { value: '₱18.4M+', label: 'Client Revenue Tracked', sub: 'Across 45+ Ormoc MSMEs' },
  { value: '3.9x', label: 'Average Local Ad ROAS', sub: 'Meta & Google campaigns' },
  { value: '#1', label: 'Maps Placement Rate', sub: '92% in Ormoc top 3 pack' },
  { value: '14 Days', label: 'Average Launch Window', sub: 'From audit to campaign live' },
];

export const ORMOC_BARANGAYS = [
  'Ormoc Centro / Poblacion',
  'Cogon',
  'Linao',
  'Can-adieng',
  'Valencia',
  'Camp Downes',
  'Dolores',
  'San Pablo',
  'Ipil',
  'Tambulilid',
  'Alegria',
  'Dayhagan',
  'Milagro',
  'Lake Danao Area',
  'Other Ormoc Barangay',
];

export const BUSINESS_TYPES = [
  'Food & Beverage / Cafe / Resto',
  'Pasalubong / Delicacies & Souvenirs',
  'Tourism / Resort / Eco-Tours',
  'Retail Store / Fashion Boutique',
  'Health Clinic / Dental / Wellness',
  'Professional Services / Accounting / Legal',
  'Construction / Home Improvement',
  'Auto Care / Motorcycle Parts',
  'Agriculture & Agribusiness',
  'New Startup / Online Brand',
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'local-seo-maps',
    number: '01',
    title: 'Google Maps & Local Search Dominance',
    tagline: 'Get found the second locals and visiting tourists search in Ormoc.',
    description: 'We claim, verify, optimize, and rank your Google Business Profile so you show up at the top of the Google Maps 3-Pack when someone searches for your trade in Leyte.',
    outcomes: [
      'Top 3 placement on Google Maps for high-intent Ormoc keywords',
      'Automated review capture system for authentic 5-star feedback',
      'Complete local geotagged photo citations and NAP consistency',
      'Direct click-to-call and in-store navigation tracking',
    ],
    deliverables: [
      'Google Business Profile complete audit & optimization',
      'Local directory citations (Waze, Apple Maps, YellowPages PH)',
      'QR code review cards for counter and table displays',
      'Monthly search impression and direction request analytics',
    ],
    idealFor: 'Cafes, clinics, automotive shops, retail outlets, and dine-in restaurants.',
  },
  {
    id: 'meta-growth-ads',
    number: '02',
    title: 'Hyper-Local Meta & Messenger Funnels',
    tagline: 'Stop burning budget on generic boosts. Target paying Ormoc customers.',
    description: 'Data-driven Facebook and Instagram ad campaigns restricted to Ormoc City radius, Leyte commuters, and incoming ferry tourists from Cebu. Connected straight to an automated Messenger lead flow.',
    outcomes: [
      'Targeted reach to 25,000 to 70,000 active Ormoc residents',
      'Direct inquiries in Messenger within 30 seconds of seeing the ad',
      'Cost per qualified local lead reduced by an average of 54%',
      'Automated FAQ & reservation chatbot to capture after-hours inquiries',
    ],
    deliverables: [
      'Ad creative design, copywriting in conversational Tagalog/Bisaya/English',
      'Custom audience segmentation (Ormoc Centro, commuters, parents, youth)',
      'Automated ManyChat / Meta Messenger booking sequence',
      'Real-time weekly ad spend and customer acquisition reporting',
    ],
    idealFor: 'Food joints, fitness gyms, beauty salons, retail drops, and service contractors.',
  },
  {
    id: 'brand-packaging',
    number: '03',
    title: 'Brand Identity & Shelf-Ready Packaging',
    tagline: 'Transform a backyard operation into a premium, recognized regional brand.',
    description: 'We craft distinctive visual brand systems, physical storefront signboards, menus, and export-grade product packaging tailored for Ormoc Queen Pineapple treats, delicacies, and local craft goods.',
    outcomes: [
      'Command 25% to 40% higher retail price points with premium aesthetic packaging',
      'FDA-compliant label layouts and barcode-ready product packaging',
      'Cohesive visual identity across storefront, social media, and staff uniforms',
      'Unboxing and gifting appeal ready for supermarket and airport shelves',
    ],
    deliverables: [
      'Primary logo, alternate marks, typography, and color guidelines',
      'Packaging dielines for pouches, gift boxes, jars, or takeaway containers',
      'Physical signage blueprints for outdoor facade and interior displays',
      'Full vector master files ready for commercial printing in Leyte or Cebu',
    ],
    idealFor: 'Pasalubong producers, agro-enterprises, coffee roasters, and boutique retailers.',
  },
  {
    id: 'short-form-video',
    number: '04',
    title: 'On-Location Reels & TikTok Production',
    tagline: 'High-energy vertical video shot directly at your Ormoc establishment.',
    description: 'Our mobile production crew visits your Ormoc premises with 4K cameras, wireless audio, and cinematic lighting to capture authentic behind-the-scenes, food preparation, and customer storytelling reels.',
    outcomes: [
      'Stop-the-scroll video content crafted for viral local algorithm reach',
      'Consistent posting schedule with zero filming burden on business owners',
      'Relatable, human-centered storytelling that builds deep community trust',
      'Library of evergreen video assets for organic feed and paid ads',
    ],
    deliverables: [
      'Half-day or full-day on-site video shoot in Ormoc City',
      '4 to 8 edited 4K vertical reels per month with trending audio & captions',
      'Scriptwriting and hook formulation tailored for Eastern Visayas culture',
      'High-resolution raw photo archive for daily stories and social posts',
    ],
    idealFor: 'Restaurants, tourist spots, wellness spas, fashion shops, and real estate.',
  },
  {
    id: 'conversion-websites',
    number: '05',
    title: 'High-Speed Web & Digital Ordering Funnels',
    tagline: 'Lightning-fast mobile pages built for local 4G connections and instant orders.',
    description: 'We build clean, responsive websites optimized for smartphone shoppers with one-tap GCash / Maya payment options, digital menus, and instant Viber / SMS dispatching.',
    outcomes: [
      'Sub-second loading times on smart mobile data networks',
      'Zero monthly platform commission fees compared to commercial delivery apps',
      'Direct order intake to your staff phone without intermediary delays',
      'Google-indexed pages establishing permanent local brand credibility',
    ],
    deliverables: [
      'Custom responsive mobile-first website with clean modern design',
      'Direct click-to-chat, click-to-call, and interactive catalog/menu',
      'Local payment integration guide (GCash, Maya, Bank Transfer, COD)',
      'Fast hosting configuration with custom domain support',
    ],
    idealFor: 'Specialty bakeries, tour operators, B2B suppliers, and professional practices.',
  },
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cafe-case-study',
    title: 'From Empty Tables to 3-Hour Weekend Waiting Lists',
    businessName: 'Centro Bean & Bloom',
    location: 'Real Street, Ormoc Centro',
    industry: 'Specialty Cafe & Artisanal Bakery',
    image: cafeImg || '/images/case_study_cafe_1791167383697.jpg',
    challenge: 'Facing intense competition from national chain outlets, this cozy homegrown cafe was struggling with slow weekday afternoons and lack of visibility for their signature handcrafted pineapple pastries.',
    solution: 'We revamped their Google Maps profile with professional appetizing photography, launched weekly TikTok behind-the-scenes reels showing the morning baking process, and ran a targeted 3-kilometer radius "Midday Coffee Break" ad campaign on Facebook.',
    metrics: [
      { label: 'Weekend Footfall', value: '+185%' },
      { label: 'Monthly Revenue', value: '₱440K+' },
      { label: 'Google Maps Rank', value: '#1 for "Cafe Ormoc"' },
    ],
    quote: {
      text: 'Before Brand|Bossing, we relied on passersby on Real Street. Now we get people driving from Kananga, Albuera, and tourists straight from the Ormoc port asking for our signature pastry.',
      author: 'Atty. Cristina Veloso',
      role: 'Co-Founder & Head Baker',
    },
  },
  {
    id: 'delicacy-case-study',
    title: 'Scaling Ormoc Queen Pineapple Into High-Value Gifting',
    businessName: 'Isla Reina Delicacies',
    location: 'Barangay Cogon, Ormoc City',
    industry: 'Agri-Product & Pasalubong Packaging',
    image: productImg || '/images/case_study_product_1791167396742.jpg',
    challenge: 'Producing world-class sweet pineapple tarts and jams, but packaged in basic plastic wraps that made it difficult to sell in high-end specialty stores or online marketplaces.',
    solution: 'Engineered a cohesive luxury packaging box celebrating Ormoc’s pineapple heritage, built an express online order catalog, and conducted a targeted campaign targeting Ormocanons working overseas (OFWs) sending pasalubong home.',
    metrics: [
      { label: 'Average Order Value', value: '+74%' },
      { label: 'Piña Festival Pre-Orders', value: '2,800+ Boxes' },
      { label: 'Retail Stockists', value: '18 Leyte Stores' },
    ],
    quote: {
      text: 'Brand|Bossing transformed our homegrown family recipe into an iconic regional gift. Supermarkets in Tacloban and Cebu immediately accepted our boxes because the branding speaks quality.',
      author: 'Eduardo "Jun" Mendoza',
      role: 'Managing Director',
    },
  },
  {
    id: 'resort-case-study',
    title: 'Filling Weekday Eco-Cabins at Lake Danao',
    businessName: 'Lake Danao Haven Retreat',
    location: 'Lake Danao Natural Park, Ormoc',
    industry: 'Eco-Tourism & Cabin Stays',
    image: resortImg || '/images/case_study_resort_1791167408245.jpg',
    challenge: 'While weekends were occasionally booked, weekday occupancies averaged under 18% due to clunky manual SMS reservations and low awareness among Cebu travelers taking fast ferries.',
    solution: 'Produced stunning cinematic drone and 4K reels showcasing morning mist over Lake Danao, automated instant Messenger booking calendar confirmations, and ran geo-targeted ads to Cebu professionals looking for weekend getaways.',
    metrics: [
      { label: 'Weekday Occupancy', value: '68% (from 18%)' },
      { label: 'Quarterly Booking Value', value: '₱1.35M' },
      { label: 'Direct Booking Share', value: '89% via Messenger' },
    ],
    quote: {
      text: 'Our reservation phone used to be silent on Tuesdays. Now our inbox is organized, guests book directly without agency commissions, and we are almost fully booked two months in advance.',
      author: 'Maricar Larrazabal-Tan',
      role: 'Managing Partner',
    },
  },
];

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    question: 'How visible is your business when someone searches your service on Google Maps in Ormoc?',
    options: [
      { text: 'We are not on Google Maps or do not have a claimed profile.', score: 0, tip: 'You are losing over 60% of high-intent local buyers who immediately pick the first 3 Maps results.' },
      { text: 'We are on Google Maps, but information, photos, or hours are outdated.', score: 8, tip: 'Updating photos, hours, and answering reviews can double your search direction requests in 14 days.' },
      { text: 'Claimed and verified, with a few reviews, but not consistently in the top 3.', score: 14, tip: 'Targeted local citations and a steady review cadence will push you into the dominant top 3 pack.' },
      { text: 'Top 3 ranked with 50+ fresh reviews and weekly photo updates.', score: 20, tip: 'Excellent foundation! Your next leverage is converting these searchers into repeat customers via social retargeting.' },
    ],
  },
  {
    id: 2,
    question: 'How fast and consistently does your business reply to Facebook Page inquiries?',
    options: [
      { text: 'We check once every few days or miss many messages.', score: 0, tip: 'Ormoc customers expect quick responses; 78% buy from the vendor who replies within 5 minutes.' },
      { text: 'We reply within a few hours during normal business hours.', score: 8, tip: 'Setting up an instant automated greeting and quick-reply menu will keep evening and weekend prospects engaged.' },
      { text: 'We reply within 15 minutes and have basic saved replies.', score: 14, tip: 'You have good responsiveness. Add an automated appointment/menu selector to convert faster.' },
      { text: 'Under 2-minute average response with automated Messenger flow & active team.', score: 20, tip: 'Outstanding customer experience! You are primed for high-volume paid ad traffic.' },
    ],
  },
  {
    id: 3,
    question: 'What is your current strategy for paid social advertising in Ormoc City?',
    options: [
      { text: 'We have never run paid ads, relying only on free organic posts.', score: 0, tip: 'Facebook organic reach is now below 4%. Without targeted local ads, your posts only reach existing friends.' },
      { text: 'We occasionally click the "Boost Post" button with random ₱200 budgets.', score: 7, tip: 'Boost Post targets vanity likes rather than local foot-traffic or sales. Meta Ads Manager offers 5x better ROI.' },
      { text: 'We run regular monthly ad campaigns with defined audience radius.', score: 14, tip: 'Refining your creative hooks and testing video reels can lower your customer acquisition cost significantly.' },
      { text: 'Structured conversion funnels, custom retargeting, and strict ROAS tracking.', score: 20, tip: 'Top-tier execution! You are dominating mindshare in your Ormoc niche.' },
    ],
  },
  {
    id: 4,
    question: 'How would you describe your visual content (photos, videos, menus, packaging)?',
    options: [
      { text: 'Casual phone photos with uneven lighting, no standard logo or design.', score: 0, tip: 'Customers judge product quality by visual presentation. Clean visuals allow you to charge higher prices.' },
      { text: 'Some decent photos, but inconsistent styling and no regular video reels.', score: 8, tip: 'Short-form vertical video (Reels) is currently favored by algorithms 4:1 over static photos in the Philippines.' },
      { text: 'Consistent brand colors, clean graphic templates, and occasional video.', score: 15, tip: 'Good visual discipline. Incorporating authentic customer reaction reels will boost organic shares.' },
      { text: 'Professional studio-grade photos, dynamic 4K vertical reels, shelf-ready packaging.', score: 20, tip: 'Brand-level polish that builds immediate trust with first-time buyers and corporate clients.' },
    ],
  },
  {
    id: 5,
    question: 'How easy is it for an interested customer to browse your catalog/menu and place an order?',
    options: [
      { text: 'They have to chat and ask "HM?" (How Much) because we have no public price list.', score: 0, tip: 'Price friction causes 65% of potential buyers to leave without asking. Transparent catalogs close faster.' },
      { text: 'We send a static photo/PDF of our menu when asked in chat.', score: 7, tip: 'Static images are hard to read on small screens. A mobile-friendly interactive link increases order speed.' },
      { text: 'We have an updated pinned post or Google Drive link with clear options.', score: 13, tip: 'Convenient, but adding 1-tap ordering with GCash/Maya confirmation eliminates drop-off.' },
      { text: 'A dedicated mobile-optimized ordering link or website with seamless payment options.', score: 20, tip: 'Frictionless checkout! You can run ads straight to this page for maximum sales velocity.' },
    ],
  },
];

export const PACKAGE_TIERS = [
  {
    id: 'ormoc-msme-growth',
    name: 'Ormoc MSME Growth Plan',
    badge: 'Exclusive All-in-One MSME Offer',
    monthlyPrice: 2500,
    setupFee: 0,
    isPopular: true,
    ideal: 'Engineered specifically for Ormoc micro and small businesses—neighborhood cafes, food stalls, retail stores, clinics, water refilling stations, salons, and home-based ventures.',
    features: [
      'Complete Google Maps & Google Business Profile optimization (top Ormoc local ranking)',
      'Targeted Facebook & Instagram local ad campaign setup (reaches 15,000+ local buyers)',
      'Automated Messenger quick-reply menu (replies to inquiries in under 2 minutes 24/7)',
      'Branded promotional social media graphics & high-converting Bisaya/English ad copy',
      'Zero setup fee & flexible month-to-month arrangement (no lock-in contracts, cancel anytime)',
      'Monthly direct growth check-in with the Brand|Bossing executive team',
    ],
    expectedReach: '15,000–25,000 Ormocanons/mo',
    turnaround: 'Launch in 3–5 days',
  },
];

export const TESTIMONIALS = [
  {
    quote: 'Brand|Bossing knows Ormoc inside and out. They did not just give us generic advice; they understood that people in Ormoc buy through trust, word-of-mouth, and fast Messenger replies. Our cafe revenues doubled within 90 days.',
    author: 'Kristine Mae Alcantara',
    role: 'Founder, The Backyard Grind',
    location: 'Cogon, Ormoc City',
  },
  {
    quote: 'We were spending money on boosted Facebook posts with zero return. Brand|Bossing set up an actual local funnel, fixed our Google Maps location, and we now receive patient inquiries daily for our dental practice.',
    author: 'Dr. Raymond Chu, DMD',
    role: 'Lead Dentist, Ormoc Smile Studio',
    location: 'Ormoc Centro, Leyte',
  },
  {
    quote: 'As an agro-processor selling Ormoc pineapple delicacies, our packaging was holding us back. Their team created a gift-box design that won shelf space in supermarkets across Region 8. Highly recommended!',
    author: 'Teresita "Nanay Tess" Gomez',
    role: 'Proprietor, Ormoc Gold Agro-Products',
    location: 'Valencia, Ormoc City',
  },
];

export const ORMOC_LOCAL_INSIGHTS = [
  {
    title: 'The Port & Gateway Advantage',
    summary: 'Ormoc is the primary maritime crossroads of Eastern Visayas, welcoming thousands daily via SuperCat, OceanJet, and FastCat from Cebu. We run geo-fenced arrival campaigns catching visitors the moment their ship docks.',
  },
  {
    title: 'Fiesta & Piña Season Spikes',
    summary: 'Between May and October, Ormoc experiences major commercial spending surges around the Piña Festival and city charter celebrations. We prep marketing campaigns 6 weeks in advance to capture maximum retail share.',
  },
  {
    title: 'The 3-Kilometer Foot-Traffic Radius',
    summary: 'Unlike metro cities with fragmented districts, Ormoc Centro, Cogon, and Linao have high foot-density. A targeted local campaign saturates local awareness faster than anywhere in the region.',
  },
  {
    title: 'Bisaya & Tagalog Conversational Trust',
    summary: 'Corporate-sounding English ads often feel distant to local consumers. We write natural, warm, and compelling conversational copy that resonates with authentic Leyteño hospitality.',
  },
];

export const AGENCY_LEADERSHIP: AgencyLeader[] = [
  {
    rank: 1,
    name: 'John Carlo P. Panilag',
    role: 'Chief Executive Officer (CEO)',
    rankTitle: 'Rank 01 · Chief Executive Officer',
    initials: 'JP',
    focus: 'Executive Agency Leadership, Omnichannel Growth & Tech Architecture',
    bio: 'Serving as the top executive of Brand|Bossing, John Carlo directs the overall agency roadmap, high-level client growth strategies, and automated digital architecture. He ensures every partnered Ormoc business achieves dominant market share, fast conversion funnels, and measurable return on investment.',
    quote: 'Modern marketing wins through speed, authenticity, and seamless technology. We build digital assets that turn Ormoc traffic into verified paying customers 24/7.',
  },
  {
    rank: 2,
    name: 'Alchie M. Ayod',
    role: 'Chief Operating Officer (COO) & Creative Director',
    rankTitle: 'Rank 02 · Chief Operating Officer',
    initials: 'AA',
    focus: 'Creative Operations, On-Site 4K Reels & Brand Identity',
    bio: 'Overseeing daily agency creative operations, on-location video production, and packaging transformations. Alchie bridges big strategic visions into captivating, scroll-stopping digital content across Ormoc City and Region 8.',
    quote: 'We want the passion and hard work you put into your products to be immediately visible the moment anyone sees your brand.',
  },
  {
    rank: 3,
    name: 'Mark G. Lonzaga',
    role: 'Chief Technology Officer (CTO) & Chief Strategist',
    rankTitle: 'Rank 03 · Chief Technology Officer',
    initials: 'ML',
    focus: 'Market Positioning, Paid Meta Ads & Strategic ROI',
    bio: 'Specializing in market positioning, paid advertising funnels, and revenue architecture. Mark oversees technical ad infrastructure, client profitability audits, and ensures every Ormoc business partnered with Brand|Bossing achieves tangible return on ad spend.',
    quote: 'Our goal is simple: make our homegrown Ormoc businesses the undisputed first choice for locals and visiting tourists alike.',
  },
  {
    rank: 4,
    name: 'Raniel A. Pedra',
    role: 'Chief Growth Officer (CGO) & Client Success',
    rankTitle: 'Rank 04 · Chief Growth Officer',
    initials: 'RP',
    focus: 'Business Development, MSME Partnerships & Account Expansion',
    bio: 'Heading merchant acquisitions, regional partnerships, and dedicated client success roadmaps. Raniel works on the ground across Leyte to ensure every local entrepreneur achieves consistent, month-over-month revenue expansion.',
    quote: 'Every business in Ormoc has a unique story. Our commitment is walking alongside local owners to ensure they dominate their category.',
  },
];

