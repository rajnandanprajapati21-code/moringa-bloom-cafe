# Moringa Bloom Cafe - Premium Landing Page

A modern, high-converting, responsive landing page engineered for **Moringa Bloom Cafe** in Greater Noida, UP.

---

## 🌟 Highlights of the Implementation

1. **Brand Aesthetic & Identity**:
   - Palette extracted directly from the official logo badge and the authentic cafe interior: **Botanical Leaf Green** (`#1E5128`), **Warm Terracotta/Amber** (`#D37B40`), **Linen Cream** (`#FAF8F5`), and **Teal Banquette Accent** (`#174E56`).
   - Integrated actual uploaded assets: Official Logo (`assets/images/moringa_logo.jpg`) and real cafe interior photograph (`assets/images/cafe_interior.jpg`).

2. **Conversion Rate Optimization (CRO)**:
   - Visible, dual CTAs above the fold with pre-filled WhatsApp messages (`https://wa.me/917290880009`).
   - Clickable `tel:` and directions triggers across the entire page.
   - Sticky bottom action bar for mobile visitors with instant **Call Now**, **WhatsApp Order**, and **Google Maps**.
   - Built-in analytics event hooks (`data-track-cta`) supporting Google Analytics 4 (`gtag`) and Meta Pixel (`fbq`).

3. **Complete 11 Sections**:
   - **Header & Sticky Navigation** with mobile drawer.
   - **Section 1: Hero Section** with selected winning headline: *"Fresh Flavours, Natural Goodness & Handcrafted Cafe Delights"*, verified trust badges, and floating bestseller card.
   - **Section 2: About Moringa Bloom Cafe** with brand story and 3 core feature pillars.
   - **Section 3: Featured Menu Showcase** with interactive category filters (*All, Gourmet Momos, Sizzlers, Shakes, Mocktails, Snacks*), 100% vegetarian indicators, prices, and one-click WhatsApp order buttons.
   - **Section 4: Why Choose Us** featuring 4 authentic differentiators with custom icons.
   - **Section 5: Visual Experience Gallery** featuring real interior photos + culinary highlights with a full-screen interactive lightbox.
   - **Section 6: Special Offers & Experiences** highlighting birthday packages, sizzler combos, and hangout treats.
   - **Section 7: Social Proof & Reviews** with star ratings, occasion tags, and Google Maps review link.
   - **Section 8: Location, Timings & Plan Your Visit** with embedded responsive Google Map, address, timings, and direct route button.
   - **Section 9: Frequently Asked Questions** with accessible, smooth accordion expand/collapse.
   - **Section 10: Final Conversion Banner** providing a high-CTR push to order or visit.
   - **Section 11: Comprehensive Footer** with contact details, quick links, social placeholders, and copyright notice.

---

## 📁 File Structure

```
Rajfashion/
├── index.html                   # Main semantic, accessible landing page
├── assets/
│   ├── css/
│   │   └── style.css            # Custom design tokens, typography, shadows, animations
│   ├── js/
│   │   ├── cafe-config.js       # Central editable business data (phone, hours, menu, offers)
│   │   └── main.js              # Interactive tabs, mobile menu, FAQ accordion, lightbox, CRO tracking
│   └── images/
│       ├── moringa_logo.jpg     # Official logo
│       └── cafe_interior.jpg    # Authentic cafe interior photo
└── README.md                    # Customization & deployment guide
```

---

## ✏️ How to Customize Business Information

### 1. Central Configuration (`assets/js/cafe-config.js`)
All primary business details, menu items, prices, and questions are structured in `assets/js/cafe-config.js`. You can edit:
- **Phone Number / WhatsApp**: Update `phone` and `whatsapp`.
- **Opening Hours**: Modify `openingHours` and `daysOpen`.
- **Menu Items & Prices**: Each menu item is a JavaScript object with `name`, `description`, `price`, `badge`, `image`, and `whatsappQuery`.
- **Special Offers & Birthday Packages**: Edit the `offers` array.
- **FAQs**: Add or edit questions and answers in the `faqs` array.

### 2. Replacing Images
- **Logo**: Replace `assets/images/moringa_logo.jpg` with any new logo file (keep the same filename or update the path in `index.html` and `cafe-config.js`).
- **Interior Photos**: Replace `assets/images/cafe_interior.jpg` or add additional photos into `assets/images/`.
- **Food Photos**: Simply drop your authentic food photography into `assets/images/` and update the `src` attributes in `index.html` or `cafe-config.js`.

---

## 🚀 How to Host or Deploy

### Option A: WordPress / Hostinger (Current Setup)
Because your live site `moringabloomcafe.com` is hosted on WordPress/Hostinger:
1. **Upload via File Manager / FTP**:
   - Connect to Hostinger File Manager.
   - Upload the contents of this folder into `public_html/` or a custom subfolder like `public_html/landing/`.
2. **Or as a Custom WordPress Page Template**:
   - In your WordPress theme directory (`wp-content/themes/astra-child/`), create `page-landing.php` and paste the HTML, copying the `assets` folder into your theme root.

### Option B: Free Static Hosting (Netlify / Vercel / GitHub Pages)
- Simply drag and drop the `Rajfashion` folder onto [Netlify Drop](https://app.netlify.com/drop) or push to a GitHub repository connected to Vercel/GitHub Pages. It works out of the box with 0 build steps.

---

## 📋 Checklist of Information You Can Provide Later

Whenever you have additional details, you can easily plug them in:
- [ ] Official Instagram handle link (currently `#` placeholder in footer)
- [ ] Official Facebook page link
- [ ] Final confirmed prices for any menu items
- [ ] Additional high-resolution food & beverage photographs from the cafe
- [ ] Specific birthday package pricing or seasonal festive discounts
