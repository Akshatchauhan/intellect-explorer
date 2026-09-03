---
# Copy this file, rename it to your project slug (e.g. resonance-engine.md),
# and set `draft: false` when it's ready to appear in the Archive.
draft: true

# REQUIRED -------------------------------------------------------------------
# `id` becomes the URL: /portfolio/<id>. Keep it lowercase and hyphenated.
id: project-slug
title: Project Title
description: One or two sentences. This is the card subtitle and the page lede.

# `type` decides which tab it lands in:
#   SYSTEM → the "SYSTEMS" tab (large case-study cards, needs an image)
#   LAB    → the "LAB" tab (compact text cards, no image needed)
# Omitting `type` falls back to SYSTEM.
type: SYSTEM

# OPTIONAL -------------------------------------------------------------------
year: 2026

# Path relative to /public — e.g. /projects/earth.jpg
# SYSTEM cards render at 4:3; the detail page hero renders at 16:9.
image: /projects/your-image.jpg

# Shown as tags on the project page.
tech:
  - React
  - Figma
  - Behavioural Design

# External links — either key works for each button.
link: https://example.com
repo: https://github.com/akshatchauhan/example

# Adding `password` puts the project behind the clearance-code screen.
# NOTE: this check happens in the browser and the value ships inside the
# JavaScript bundle, so anyone can read it in devtools. Treat it as a velvet
# rope, not a lock — never put genuinely confidential work behind it.
# password: your-code
---

Everything below the front matter is the body of the case study, written in
Markdown. Headings, **bold**, _italics_, lists, links and images all render.

> Blockquotes are styled as pull quotes — useful for the framing insight.

## The Problem

What was actually broken, and for whom.

## The Approach

The reasoning, not just the output. This is the part that shows how you think.

## The Outcome

What changed. Numbers if you have them, honest qualitative results if you don't.
