# overflow-supreme-v2

A Shopify Dawn theme restyled to comprehensively replicate [us.supreme.com/collections/all](https://us.supreme.com/collections/all).

## Design Reference

| Element | Supreme Original | This Theme |
|---------|-----------------|------------|
| Logo | Red box, italic white "Supreme" | Red box, italic white "Overflow" |
| Header nav | Lowercase links below logo | Lowercase links below logo |
| Datetime | `MM/DD/YYYY HH:MMam NYC` | Live JS clock, same format |
| Background | Pure white `#fff` | Pure white `#fff` |
| Font | Arial/Helvetica 11px | Arial/Helvetica 11px |
| Left sidebar | Right-aligned category links | Right-aligned, 11px, same categories |
| Product grid | 5-col, white bg, contain images | 5-col CSS Grid, object-fit: contain |
| Product card | No border, no shadow, title + price | No border, no shadow, title + price |
| Footer | Two rows: shop/view all + season links | Matches layout exactly |

## Key Files Modified

```
assets/
  supreme-overrides.css      ← All Supreme-specific styles

sections/
  header.liquid              ← Red logo box, lowercase nav, live datetime
  footer.liquid              ← Supreme-style two-column footer
  main-collection-product-grid.liquid  ← Left sidebar + 5-col grid

templates/
  collection.json            ← Strips banner, sets 48 products/page

config/
  settings_data.json         ← White/black color scheme, 0 spacing
```

## Setup

1. Upload to your Shopify store via Shopify CLI or Theme Editor
2. The collections map to standard Shopify collection handles:
   - `/collections/new`, `/collections/jackets`, `/collections/shirts`, etc.
3. The logo text "Overflow" is hardcoded in `sections/header.liquid` — update as needed.

## Theme Base

Built on [Shopify Dawn](https://github.com/Shopify/dawn) — the official free Shopify starter theme.
