# 🧶 Solea Shell Stitch Cardigan — Shopify Theme

> A premium single-product Shopify 2.0 theme for MJ's Off The Hook Designs, built for the **Solea Shell Stitch Cardigan PDF Crochet Pattern** digital download.

![Theme Preview](assets/preview.png)

---

## ✨ Theme Features

- **Shopify Online Store 2.0** — JSON templates, section-everywhere support
- **Single-product focused** — laser-optimized for the Solea Cardigan Pattern
- **Digital download UX** — instant download trust signals, Klarna badge, PDF badges
- **Boho-coastal aesthetic** — warm sand, sage green, cream tones with shell motifs
- **Responsive & accessible** — mobile-first, WCAG 2.1 AA
- **GitHub → Shopify** — deploy directly via Shopify GitHub integration

---

## 📁 Project Structure

```
solea-shopify-theme/
├── .github/workflows/        # CI/CD: Shopify Theme Check on every PR
├── assets/                   # CSS, JS, images, fonts
├── config/                   # Theme settings schema & defaults
├── layout/                   # Root Liquid layout
├── locales/                  # Translation strings
├── sections/                 # Theme sections (header, hero, product, etc.)
├── snippets/                 # Reusable Liquid snippets
└── templates/                # JSON page templates
```

---

## 🚀 Deployment: GitHub → Shopify

### Prerequisites
- A Shopify store (any plan)
- A GitHub account with this repo forked/cloned

### Steps

1. **Fork or clone this repository** to your GitHub account.

2. **In your Shopify Admin**, go to:
   `Online Store → Themes → Add theme → Connect from GitHub`

3. **Authorize the Shopify GitHub app** and select this repository.

4. **Select the branch** you want Shopify to track (e.g., `main`).

5. **Click "Connect"** — Shopify will pull the theme automatically.

6. **Preview or publish** the theme from your Themes dashboard.

> ⚡ Every push to your connected branch will automatically update the theme in your Shopify admin (as an unpublished version for review).

---

## 🛠️ Local Development (Optional)

### Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

### Authenticate

```bash
shopify auth login --store YOUR-STORE.myshopify.com
```

### Start Development Server

```bash
shopify theme dev --store YOUR-STORE.myshopify.com
```

### Push Theme to Store

```bash
shopify theme push --store YOUR-STORE.myshopify.com
```

### Run Theme Check (Linting)

```bash
shopify theme check
```

---

## 🎨 Customization

All theme settings are available in the **Shopify Theme Editor** (`Online Store → Customize`):

| Setting | Description |
|---|---|
| `colors_primary` | Primary brand color (default: warm sand `#C4956A`) |
| `colors_accent` | Accent color (default: sage green `#7A9E87`) |
| `product_title` | Override the hero product title |
| `show_klarna_badge` | Show/hide the Klarna installment widget |
| `video_url` | YouTube/Vimeo URL for the pattern preview video |
| `facebook_group_url` | Link to the Facebook community support group |

---

## 🧶 Product Setup in Shopify

1. Create a **Product** in your Shopify admin:
   - Title: `Solea Shell Stitch Cardigan Pattern`
   - Price: `$14.99`
   - Type: `Digital Download`
   - Tags: `crochet, pattern, cardigan, summer, pdf, digital`

2. Install the **Digital Downloads** app (free by Shopify) and attach your PDF file to the product.

3. Set the product as the **homepage featured product** in Theme Editor.

---

## 📋 Sections Overview

| Section | Purpose |
|---|---|
| `hero-banner` | Full-width hero with CTA |
| `product-main` | Add to cart, price, sizes |
| `product-features` | What's included, stitch highlights |
| `size-guide` | Full bust/sleeve size chart |
| `video-preview` | Embedded video tutorial preview |
| `testimonials` | Customer review cards |
| `faq` | Accordion FAQ |
| `trust-badges` | Copyright, GPSR, instant download |

---

## ⚖️ Copyright Notice

This theme is open-source under the MIT License.

Pattern content and product details are © 2026 MJ's Off The Hook Designs Inc. All Rights Reserved.
