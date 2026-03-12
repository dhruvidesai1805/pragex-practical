# Stripe-Inspired Architecture Diagram

A high-fidelity, interactive architecture diagram built with **Next.js**, **Tailwind CSS**, and **Framer-equivalent SVG animations**. This project demonstrates complex UI orchestration, responsive design, and smooth data-flow visualizations.

## ✨ Features

- **Sequential SVG Animations**: Complex masked paths that simulate real-time data flow (Orchestration → PSP banks).
- **Grouped Node Orchestration**: Top source nodes cycle in intelligently interleaved groups to ensure the panel never looks empty.
- **Pixel-Perfect UI**: Custom-built border containers, glassmorphism effects, and a dynamic tech-icon grid.
- **Responsive Scaling**: The entire diagram scales proportionally to fit the viewport while maintaining absolute alignment between SVG paths and React components.
- **Professional Architecture**: Clean separation of concerns with custom hooks for animations, centralized constants for assets, and unified TypeScript interfaces.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dhruvidesai1805/pragex-practical.git
   cd pragex-practical
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start Development Server**:

   ```bash
   npm run dev
   ```

Navigate to [http://localhost:3000](http://localhost:3000) to view the project.

## 🏗️ Technical Implementation

### Project Structure

```text
src/
├── app/                  # Next.js App Router (Layouts & Main Page)
├── components/           # UI Components
│   └── stripe-section/   # Modular diagram components (TopPanel, BottomSeq, etc.)
├── constants/            # Centralized icon paths and configuration
├── hooks/                # Custom hooks (useAnimationTick, useResponsiveScale)
└── types/                # Unified TypeScript interfaces
```

### Key Technical Patterns

- **useAnimationTick**: A custom interval-based hook that drives the synchronized build-up and teardown of the "relay race" animations.
- **SVG Masking**: Used for the growing dashed-line effect, allowing for smooth, performative line drawing.
- **Modular Components**: Every part of the diagram (Source, Intermediary, Destination) is its own component, making the layout easy to maintain and test.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: Custom SVG & High-res PNG assets
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

_This project was created as a high-quality technical implementation of a Stripe-style landing page animation._
