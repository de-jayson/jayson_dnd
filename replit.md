# Developer Portfolio

## Overview
A stunning, production-ready developer portfolio website with a futuristic, dark-first aesthetic featuring interactive elements, smooth animations, and a modern tech stack.

## Current State
**Status:** Complete MVP
**Last Updated:** December 8, 2025

## Project Architecture

### Frontend (`client/src`)
- **Framework:** React with Vite
- **Styling:** Tailwind CSS with custom CSS variables
- **Components:** Shadcn/UI component library
- **State Management:** React hooks + TanStack Query
- **Routing:** Wouter (single-page with hash navigation)

### Backend (`server/`)
- **Framework:** Express.js
- **Storage:** In-memory (MemStorage)
- **API:** REST endpoints for contact form

### Shared (`shared/`)
- **Schema:** Drizzle ORM schema definitions with Zod validation

## Key Features

### Interactive Elements
1. **Particle Canvas Background** - Animated code characters with mouse interaction
2. **Custom Cursor** - Neon cursor with trailing effect (desktop only)
3. **Terminal Overlay** - Toggle with tilde (~) key for a hacker aesthetic
4. **Theme Toggle** - Dark/Light mode with smooth transitions

### Sections
1. **Hero** - Typing animation with role rotation
2. **About** - Timeline with animated counters
3. **Skills** - Grid with skill bars and glow effects
4. **Projects** - Cards with gradient backgrounds (no external images)
5. **Experience** - Alternating timeline layout
6. **Contact** - Form with validation and backend integration
7. **Footer** - Quick links and social media

### Design System
- **Primary Color:** Cyan (#00ffff / hsl 180 100% 50%)
- **Accent Color:** Green (#00ff88 / hsl 155 100% 55%)
- **Neon Effects:** Glow shadows and text shadows
- **Glass Morphism:** Backdrop blur with subtle borders
- **Animations:** Scroll-triggered reveals, floating icons, pulse effects

## Technical Notes

### CSS Classes
- `.glass` / `.glass-strong` - Glassmorphism panels
- `.neon-glow` / `.neon-text` - Neon glow effects
- `.gradient-text` - Multi-color gradient text
- `.grid-pattern` - Subtle grid background
- `.hover-lift` - Card hover animation
- `.animate-float` - Floating icon animation

### API Endpoints
- `POST /api/contact` - Submit contact form message
- `GET /api/contact` - Get all contact messages

### Environment
- No external image dependencies (uses CSS gradients)
- No database required (in-memory storage)
- SESSION_SECRET configured

## User Preferences
- Dark-first design aesthetic
- Futuristic/cyberpunk visual style
- Clean, minimal UI with neon accents
- Mobile-responsive layout
- Accessibility considerations for theme toggle

## Recent Changes
- Fixed TypeScript Set iteration errors
- Added data-testid attributes for testing
- Improved responsive design for floating icons
- Fixed animation cleanup/memory leaks
- Added gradient placeholders instead of external images
- Enhanced dark/light mode glass panel styles
