export const site = {
  name: 'GoSites',
  domain: 'gosites.uk',
  description:
    'Done-for-you websites for UK businesses, built fast with strong design, clear messaging, and dependable delivery.',
  copyright: '© 2026 GoSites. All rights reserved.',
  madeIn: '❤️ Made with love In London',
}

export const navigation = [
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#get-started' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export const topBanner = {
  text:
    'Early Bird Pricing - Access expert-made websites, fully done for you, from just £300.',
  cta: {
    label: 'Start Now',
    href: '#pricing',
  },
}

export const hero = {
  eyebrow: 'London based Website Design Agency',
  trustpilot: {
    avatarCount: 5,
    ratingLabel: '5 Stars',
    proofLine: 'Trusted by 50+ clients in March, 2026',
  },
  title: 'Create striking websites within 48 hours - fully done for you.',
  subtitle: 'AI-driven website development for UK businesses.',
  description:
    'Your business deserves a great website. Our expert team combines sharp design, proven systems, and rapid execution to deliver high-standard websites at affordable rates and with fast turnaround.',
  primaryCta: {
    label: 'Start Now',
    href: '#pricing',
  },
  secondaryCta: {
    label: 'Submit Service Request',
    href: '#contact',
  },
}

export const vslSection = {
  eyebrow: 'Quick Introduction Video',
  title: 'Watch this 5-minute video to see if this is for you.',
  description:
    "Our web design service comes with an expert team that learns about your business, chooses the right technologies and infrastructure, creates highly personalised content, shapes the brand direction, and builds the website for you with speed and precision.",
  embedTitle: 'GoSites introduction video',
  embedUrl: '',
  cta: {
    label: 'Submit Service Request',
    href: '#contact',
  },
}

export const socialProof = {
  eyebrow: 'Client Results',
  title: 'Why our clients love us ❤️',
  logos: [
    'Apex Advisory',
    'Northlane Dental',
    'Bloom Clinics',
    'Rivet Legal',
    'Nova Build',
    'Peak Motors',
    'Ashworth Estates',
    'Crafted Kitchens',
  ],
  websiteShowcaseTitle: 'See Some Of Our Websites',
  websites: [
    {
      title: 'Smile Studio',
      description:
        'Single-page lead generation site built to turn local search traffic into booked consultations.',
      href: '#',
      imageLabel: 'Dental website preview',
    },
    {
      title: 'Oakwell Finance',
      description:
        'Professional service site with authority-led copy, trust layers, and a cleaner user journey.',
      href: '#',
      imageLabel: 'Finance website preview',
    },
    {
      title: 'Prime Roofing',
      description:
        'Conversion-focused local business site with urgent calls to action and quote capture.',
      href: '#',
      imageLabel: 'Roofing website preview',
    },
  ],
  testimonials: [
    {
      company: 'Northlane Dental',
      quote:
        'The whole process felt far more structured than any agency we had used before. The first draft already looked launch-ready.',
      name: 'Sophie Patel',
      role: 'Practice Manager',
      initials: 'SP',
    },
    {
      company: 'Apex Advisory',
      quote:
        'Fast turnaround, excellent communication, and a site that finally matched the quality of our offer.',
      name: 'Marcus Hale',
      role: 'Founder',
      initials: 'MH',
    },
    {
      company: 'Nova Build',
      quote:
        'They translated a messy offer into something clear, premium, and easy for potential clients to understand.',
      name: 'Jordan Ellis',
      role: 'Operations Director',
      initials: 'JE',
    },
    {
      company: 'Bloom Clinics',
      quote:
        'They moved quickly without making the work feel rushed. The end result gave us a much stronger online presence.',
      name: 'Anika Rahman',
      role: 'Clinic Owner',
      initials: 'AR',
    },
  ],
  cta: {
    label: 'Start Now',
    href: '#pricing',
  },
}

export const getStarted = {
  eyebrow: 'Get Started',
  title: 'Get started in 3 easy steps.',
  steps: [
    {
      number: '01',
      title: 'Skip to payment, or submit a service request',
      description:
        "Click 'Start Now' to choose your plan, make payment, and book your onboarding call. If you want to speak to us before purchasing, submit the service request form. We review every submission and reply within 24 hours. Early Bird pricing is strictly limited to the first 25 customers.",
    },
    {
      number: '02',
      title: 'Complete the onboarding form',
      description:
        'After you choose your plan, you will be redirected to the onboarding form so we can collect access, business information, and project context. Once that is done, you will book a 15-minute onboarding call with our founder to review the brief and next steps.',
    },
    {
      number: '03',
      title: 'Receive your first draft within 24 to 48 hours',
      description:
        'Once the onboarding call is complete, we move into delivery and send the first website draft for review. Depending on the plan, we may first finalise prerequisites such as brand scheme, copy, domain setup, or action items needed for launch.',
    },
  ],
  primaryCta: {
    label: 'Start Now',
    href: '#pricing',
  },
  secondaryCta: {
    label: 'Submit Service Request',
    href: '#contact',
  },
}

export const pricingSection = {
  eyebrow: 'Pricing',
  title: 'Transparent and affordable pricing plans.',
  plans: [
    {
      name: 'GoSites Starter',
      subtitle: 'Single-page professional website',
      bestFor:
        'Landing pages, consultants, service businesses, and local businesses.',
      regularPrice: '£600',
      launchPrice: '£300',
      featured: false,
      sections: [
        {
          title: 'What you get',
          items: [
            'Professionally designed single-page website',
            'Conversion-focused layout structure',
            'Mobile-optimised responsive design',
            'Contact or enquiry form',
            'SEO-ready site structure',
            'Basic speed optimisation',
            'Brand colour and typography setup',
            'Copy structure guidance',
          ],
        },
        {
          title: 'Support',
          items: [
            'Unlimited minor revisions',
            'Two major revision rounds',
            '60-minute strategy call',
            'Ongoing messaging support',
          ],
        },
        {
          title: 'Delivery',
          items: [
            'Fast turnaround',
            'Full website ownership',
            'Complete source code handoff',
          ],
        },
      ],
      cta: {
        label: 'Start Now',
        href: '#contact',
      },
    },
    {
      name: 'GoSites Business',
      subtitle: 'Multi-page professional website',
      bestFor: 'Growing businesses that need a full website presence.',
      regularPrice: '£1,000',
      launchPrice: '£500',
      featured: true,
      sections: [
        {
          title: 'What you get',
          items: [
            'Up to 5 professionally designed pages',
            'Typical pages include Home, About, Services, Contact, and one additional page',
            'Mobile-optimised responsive design',
            'SEO-ready site structure',
            'Lead capture forms',
            'Conversion-focused page layout',
            'Analytics setup',
            'Brand styling system',
            'Copy structure guidance',
          ],
        },
        {
          title: 'Support',
          items: [
            'Unlimited minor revisions',
            'Two major revision rounds',
            '90-minute strategy call',
            'Ongoing messaging support',
          ],
        },
        {
          title: 'Delivery',
          items: [
            'Fast turnaround',
            'Full website ownership',
            'Complete source code handoff',
          ],
        },
      ],
      cta: {
        label: 'Start Now',
        href: '#contact',
      },
    },
    {
      name: 'GoSites Elite',
      subtitle: 'Advanced business website',
      bestFor: 'Businesses looking for an upgraded online presence.',
      regularPrice: '£2,400',
      launchPrice: '£1,200',
      featured: false,
      sections: [
        {
          title: 'What you get',
          items: [
            'Up to 25 professionally designed pages',
            'Fully structured website architecture',
            'Premium visual design direction',
            'Conversion-focused page layouts across the site',
            'Mobile-optimised responsive design',
            'Lead capture forms across key pages',
            'Conversion funnel planning and layout optimisation',
            'Brand colour and typography system',
            'Copy structure guidance for all major pages',
            'SEO-ready page structure for all pages',
            'Fast modern website architecture',
            'Speed optimisation for fast loading',
          ],
        },
        {
          title: 'Marketing & analytics',
          items: [
            'Google Analytics setup',
            'Facebook Pixel integration',
            'Conversion tracking setup',
            'Lead capture integration',
            'Basic marketing funnel optimisation',
          ],
        },
        {
          title: 'Support & delivery',
          items: [
            'Unlimited minor revisions',
            'Three major revision rounds',
            '120-minute strategy consultation call',
            'Priority messaging support during the project',
            'Fast turnaround',
            'Full website ownership',
            'Complete source code handoff',
            'Free social media page setup for up to 3 platforms',
          ],
        },
      ],
      cta: {
        label: 'Start Now',
        href: '#contact',
      },
    },
  ],
}

export const faqs = [
  {
    question: 'What exactly is included in the Early Bird offer?',
    answer:
      'The Early Bird offer gives you access to the launch pricing listed on this page. The exact scope depends on the plan you choose, but every plan is fully done for you and includes design, build, revisions, and handoff.',
  },
  {
    question: 'Who is this service best suited for?',
    answer:
      'The service is best suited to UK businesses that need a stronger online presence quickly, including consultants, local businesses, service providers, clinics, agencies, and growing brands.',
  },
  {
    question: 'How fast can you really deliver?',
    answer:
      'For prepared businesses with responsive communication, the first draft can typically be delivered within 24 to 48 hours after onboarding. Larger scopes may take longer, but speed is a core part of the offer.',
  },
  {
    question: 'Do you only work with UK businesses?',
    answer:
      'Our positioning and offer are designed around UK businesses first. That keeps the messaging, market understanding, and delivery process tightly aligned to the buyers we want to serve best.',
  },
  {
    question: 'Can I speak to someone before buying?',
    answer:
      'Yes. If you are not ready to purchase immediately, submit the service request form. We review submissions and respond within 24 hours. If timing is urgent, you may be sent straight to a booking page.',
  },
  {
    question: 'What if I already have a website?',
    answer:
      'That is common. We can rebuild an existing website, improve the messaging, upgrade the visual quality, and create a stronger conversion path without carrying forward the weak parts of the current version.',
  },
  {
    question: 'Do you help with copy and structure?',
    answer:
      'Yes. We provide copy structure guidance and shape the page flow so the offer reads clearly. If your content is incomplete, we help organise it into something usable and commercially sharp.',
  },
  {
    question: 'How many revisions do I get?',
    answer:
      'Each plan includes unlimited minor revisions and a fixed number of major revision rounds. That keeps quality high while still giving enough room to refine the work properly.',
  },
  {
    question: 'Will I own the website after delivery?',
    answer:
      'Yes. The website, codebase, and final assets are handed over to you on completion. The offer is designed to give businesses full ownership rather than trap them in an agency dependency loop.',
  },
  {
    question: 'Can you handle hosting, domains, and analytics too?',
    answer:
      'Yes. We are familiar with hosting, domain, analytics, and email infrastructure. Depending on your plan, we can help set up or advise on the right stack for your business.',
  },
  {
    question: 'What do you need from me to get started?',
    answer:
      'At minimum, we need your business context, offer details, contact information, and fast feedback during onboarding. If you already have branding, copy, images, or a domain, that helps accelerate delivery further.',
  },
  {
    question: 'What happens after I submit the service request form?',
    answer:
      'We review your information, assess fit and urgency, and either direct you to a call booking flow or reply within 24 hours with next steps.',
  },
]

export const whyDifferent = {
  eyebrow: 'Why Us',
  title: 'Why GoSites is the go-to partner for UK businesses.',
  subheading: 'Proven and tested AI-driven workflows.',
  paragraphs: [
    'Most web design and development agencies still have not adapted to the scale of disruption caused by AI. Our team combines AI specialists with experienced full-stack developers so the workflow is modern, practical, and reliable.',
    'Working with us is easy, efficient, and outcome-focused. Our design team obsesses over details and is supported by more than 88 proprietary AI workflows developed over 6 months of consistent engineering.',
    'We are a small, focused team with a 100% customer satisfaction rate and the capacity to deliver 5 to 10 websites a week for UK businesses. The pricing is accessible, but the work standard is deliberately high.',
  ],
  stats: [
    { value: '80+', label: 'Websites delivered' },
    { value: '100%', label: 'Customer satisfaction rate' },
  ],
  cta: {
    label: 'Get Started',
    href: '#pricing',
  },
}

export const howWeWork = {
  eyebrow: 'Work Process',
  title: "Here's what you can expect.",
  subtitle: 'Finally! A Completely Done For You Web Design Service',
  items: [
    {
      title: 'Putting together the prerequisites',
      description:
        'Once you are onboarded, we begin with the fundamentals. If you need help with content, logo direction, colour scheme, design references, or other foundational assets, we handle those first so the website has a strong base.',
    },
    {
      title: 'Choosing your tech stack',
      description:
        'We choose the stack that fits your business. Typical combinations include GitHub for code, Supabase or Airtable for data, Railway or Hostinger for hosting and domains, Brevo or Resend for email, and PostHog for analytics.',
    },
    {
      title: 'Creating the first design draft',
      description:
        'Once the content and technical direction are clear, we create the website structure, place the content, add imagery and graphics, and deliver the first draft for review.',
    },
    {
      title: 'Site review and finalisation',
      description:
        'We then move through the review process with a sensible number of major revisions and unlimited minor refinements. Feedback is handled on the staging site and through calls where needed until the site is ready to launch.',
    },
  ],
  graphicLabel: 'Workflow graphic placeholder',
  cta: {
    label: 'Get Started',
    href: '#pricing',
  },
}

export const founderNote = {
  eyebrow: 'From The Founder',
  title: 'Built to fix what traditional agencies keep getting wrong.',
  name: 'Priyanshu Singh',
  role: 'Founder and CEO',
  company: 'GoSites',
  quote:
    'We started GoSites as a core part of our lead generation ecosystem after seeing dozens of clients left unsatisfied or ripped off by traditional agencies. Our mission is to help 1,000 UK businesses create websites that actually do justice to their ambitions.',
  imageLabel: 'Founder image placeholder',
}

export const galleryProof = {
  eyebrow: 'Countless Success Stories',
  title: "We're an online agency with offline presence.",
  description:
    "We've met and spoken with hundreds of UK entrepreneurs, which gives us a better feel for the market and the real-world problems businesses are trying to solve. We care deeply about the people behind the websites.",
  items: [
    {
      title: 'WhatsApp feedback',
      description: 'Placeholder for WhatsApp screenshots from clients.',
    },
    {
      title: 'Founder with clients',
      description: 'Placeholder for event photos and in-person meetings.',
    },
    {
      title: 'Delivery snapshots',
      description: 'Placeholder for behind-the-scenes build and review moments.',
    },
    {
      title: 'Launch wins',
      description: 'Placeholder for social proof from finished projects.',
    },
  ],
  cta: {
    label: 'Get Started',
    href: '#pricing',
  },
}

export const contactSection = {
  eyebrow: 'Contact Us Today',
  title: 'Submit this form for general enquiries.',
  description:
    'Want to explore using our services? Use the service request form instead.',
  serviceRequestNote: {
    label: 'Use the service request form',
    href: '#top',
  },
  successMessage:
    'We have received your message and will get back to you within 24 hours.',
  cta: {
    label: 'Get Started',
    href: '#pricing',
  },
}

export const ctaBanner = {
  title:
    'Dozens of UK businesses have joined the Early Bird offer. What are you waiting for?',
  cta: {
    label: 'Get Started Today',
    href: '#pricing',
  },
}

export const trustStrip = {
  label: 'Built for serious businesses',
  text: 'Clean design. Fast delivery. Straightforward pricing.',
  pills: [
    { title: 'London-focused', icon: 'map' },
    { title: 'SEO-friendly builds', icon: 'search' },
    { title: 'Mobile-first', icon: 'mobile' },
    { title: 'AI-assisted workflow', icon: 'bot' },
  ],
}

export const services = [
  {
    number: '01',
    title: 'Single-page websites',
    description:
      'Perfect for lean offers, personal brands, campaigns, and businesses that need one strong page that actually sells.',
  },
  {
    number: '02',
    title: 'Multi-page business sites',
    description:
      'Clean, credible websites with the core pages most businesses need, built to explain the offer clearly and convert attention into action.',
  },
  {
    number: '03',
    title: 'Website refreshes',
    description:
      'If your current site looks dated, slow, or weak, we rebuild it into something you can be proud to send people to.',
  },
  {
    number: '04',
    title: 'Conversion-focused structure',
    description:
      'Clear hierarchy, strong calls to action, mobile responsiveness, and a layout designed to guide visitors instead of confusing them.',
  },
]

export const whyUs = [
  {
    title: 'Fast delivery',
    description:
      'We use an AI-assisted workflow to move quickly without sacrificing quality.',
    icon: 'clock',
  },
  {
    title: 'Clear pricing',
    description:
      'Simple packages. No bloated proposals. No unnecessary complexity.',
    icon: 'price',
  },
  {
    title: 'Modern design',
    description:
      'Minimal, high-quality layouts that feel current, premium, and credible.',
    icon: 'design',
  },
  {
    title: 'Built for business',
    description:
      'Not just pretty screens. Your site should help you win trust, explain your offer, and generate action.',
    icon: 'business',
  },
]

export const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We get clear on your business, offer, audience, and what the website needs to achieve.',
  },
  {
    number: '02',
    title: 'Build',
    description:
      'We design and develop the site using a fast, structured workflow focused on clarity, quality, and speed.',
  },
  {
    number: '03',
    title: 'Launch',
    description:
      'Once approved, we polish, optimise, and launch the site so you can start sending traffic to something that actually looks the part.',
  },
]

export const pricingPlans = [
  {
    name: 'Starter',
    price: '£300',
    description: 'For lean businesses that need one sharp page.',
    featured: false,
    features: [
      'Single-page website',
      'Next.js build',
      'Responsive layout',
      'SEO-friendly structure',
      'Contact call-to-action',
      'Launch-ready delivery',
    ],
  },
  {
    name: 'Lite',
    price: '£500',
    description:
      'A clean multi-page site for businesses that need the essentials.',
    featured: true,
    features: [
      'Up to 5 pages',
      'Home, About, Services, Contact, plus one extra',
      'Responsive design',
      'SEO-friendly structure',
      'Clean modern UI',
      'Launch-ready delivery',
    ],
  },
  {
    name: 'Plus',
    price: '£1,200',
    description:
      'For businesses that need a fuller website and stronger structure.',
    featured: false,
    features: [
      '10 to 15 pages',
      'Advanced layout system',
      'Email capture integration',
      'Analytics setup',
      'Conversion-focused structure',
      'Scalable foundation',
    ],
  },
  {
    name: 'Elite',
    price: '£3,000',
    description:
      'High-end design and a more premium execution for brands that want a stronger visual edge.',
    featured: false,
    features: [
      'Premium design direction',
      'Advanced animation',
      'Video and visual integration',
      'Strategic input',
      'High-end polish',
      'Best overall package',
    ],
  },
]

export const teamMembers = [
  {
    role: 'Founder',
    description:
      'Sets the direction, shapes the offer, and keeps the standard high from first conversation to final sign-off.',
  },
  {
    role: 'Sales Director',
    description:
      'Keeps communication clear, scopes the right package, and makes sure the process stays simple from the start.',
  },
  {
    role: 'Delivery Director',
    description:
      'Owns execution, quality control, and launch readiness so the work lands sharp and on time.',
  },
]

export const footerGroups = [
  {
    title: 'Menu',
    links: navigation,
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Refund Policy', href: '#' },
    ],
  },
]

export const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'X', href: '#' },
  { label: 'Email', href: '#contact' },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=447818023420&text=I%20would%20like%20to%20learn%20more%20about%20gosites.uk',
  },
]

export const footerDisclaimer =
  'Launch pricing, timelines, and exact deliverables may vary by scope. All projects are reviewed before final acceptance.'
