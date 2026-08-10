# RMF Field Reference

An interactive, single-page reference for the NIST Risk Management Framework (RMF) — the seven-step lifecycle defined in [NIST SP 800-37 Rev. 2](https://csrc.nist.gov/pubs/sp/800/37/r2/final) for managing security and privacy risk in federal information systems.

## What's here

- A clickable donut diagram of the seven-step cycle (Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor → back to Prepare)
- A detail card per step covering its purpose, key tasks, primary roles, and expected outputs (SSP, SAR, POA&M, ATO, etc.), each cited to its NIST task IDs

No build step or dependencies — it's plain HTML, CSS, and JavaScript.

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```
npx serve .
```

## Structure

```
index.html   — page markup
styles.css   — layout, type, and light/dark theming
script.js    — step data, the SVG cycle diagram, and interaction wiring
```

## Disclaimer

This is an independently written educational reference, not an official government publication.
