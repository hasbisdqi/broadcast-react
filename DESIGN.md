---
name: Broadcast React
description: Real-time broadcast chat platform
colors:
  primary: "oklch(0.841 0.238 128.85)"
  secondary: "oklch(0.967 0.001 286.375)"
  neutral-bg: "oklch(1 0 0)"
typography:
  display:
    fontFamily: "'Geist Variable', sans-serif"
  body:
    fontFamily: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif"
rounded:
  md: "0.875rem"
spacing:
  md: "1rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
---

# Design System: Broadcast React

## Overview

**Creative North Star: "The Modern Communicator"**

A functional, real-time chat interface focusing on minimal distraction. It uses crisp typography and a restrained palette with clear accent colors for active interactions.

**Key Characteristics:**
- Clean, minimal aesthetic
- High-contrast chat bubbles
- Focus on content readability
- Real-time interaction feedback

## Colors

The palette is restrained, using clear contrast to distinguish between chat interactions and the surrounding UI.

### Primary
- **Green Accent** (oklch(0.841 0.238 128.85)): Used for active states, highlighted chat bubbles, and primary actions.

### Secondary 
- **Cool Gray** (oklch(0.967 0.001 286.375)): Used for secondary backgrounds and subtle borders.

### Neutral
- **Pure White** (oklch(1 0 0)): Main background for uncluttered reading.
- **Deep Slate** (oklch(0.148 0.004 228.8)): Default text color.

## Typography

**Display Font:** 'Geist Variable', sans-serif
**Body Font:** 'Instrument Sans', sans-serif

**Character:** Clean, legible, and structurally sound for both long-form reading and quick scans.

## Layout

A flexible container structure optimized for chat streams, with fluid width adjusting to screen sizes while preserving comfortable line lengths.

## Elevation & Depth

The system is primarily flat. Depth is created through tonal layering and borders rather than drop shadows.

## Shapes

Soft, rounded corners (`0.875rem` default radius) to give the interface a friendly and approachable feel.

## Components

### Buttons
- **Shape:** rounded (0.875rem)
- **Primary:** Green Accent background, white text.

## Do's and Don'ts

### Do:
- **Do** keep chat bubbles easily distinguishable.
- **Do** rely on 'Instrument Sans' for user-generated content.

### Don't:
- **Don't** use heavy shadows.
- **Don't** mix multiple accent colors on the same screen.
