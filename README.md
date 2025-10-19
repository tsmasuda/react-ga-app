# React + TypeScript + Vite + Google Analytics

This project demonstrates a React application built with TypeScript and Vite, featuring a sample Google Analytics (GA4) implementation.

## Features

- React 18 with TypeScript
- Vite for fast development and building
- Google Analytics 4 (GA4) integration using `react-ga4`
- Sample event tracking:
  - Page views
  - Button clicks
  - Form submissions
  - External link clicks

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- A Google Analytics 4 property (get your Measurement ID from [Google Analytics](https://analytics.google.com/))

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Analytics

1. Create a `.env` file in the root directory (or copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Add your Google Analytics Measurement ID to `.env`:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

   Replace `G-XXXXXXXXXX` with your actual GA4 Measurement ID from your Google Analytics property.

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Google Analytics Implementation

### Analytics Module (`src/analytics.ts`)

The analytics module provides utility functions for tracking:

- `initGA(measurementId)` - Initialize Google Analytics
- `trackPageView(path)` - Track page views
- `trackEvent(category, action, label, value)` - Track custom events
- `trackButtonClick(buttonName)` - Track button clicks
- `trackFormSubmit(formName)` - Track form submissions

### Usage in Components

The `App.tsx` component demonstrates:

1. **Initialization** - GA is initialized in a `useEffect` hook on component mount
2. **Page View Tracking** - Automatically tracks the initial page view
3. **Button Click Tracking** - Tracks when the counter button is clicked
4. **Form Submit Tracking** - Tracks form submissions
5. **External Link Tracking** - Tracks clicks on external links

### Example Event Tracking

```typescript
import { trackEvent, trackButtonClick } from './analytics'

// Track a custom event
trackEvent('User Interaction', 'Button Click', 'My Button')

// Track a button click
trackButtonClick('Submit Button')
```

## Verifying Analytics

To verify that Google Analytics is working:

1. Open your browser's Developer Tools (F12)
2. Go to the Network tab
3. Filter by "google-analytics" or "collect"
4. Interact with the app (click buttons, submit forms)
5. You should see network requests being sent to Google Analytics

Alternatively, use the [Google Analytics DebugView](https://support.google.com/analytics/answer/7201382) for real-time debugging.

## Project Structure

```
react-ga-app/
├── src/
│   ├── analytics.ts       # Google Analytics utility functions
│   ├── App.tsx            # Main app component with tracking examples
│   ├── App.css
│   ├── main.tsx
│   └── ...
├── .env                   # Environment variables (create this)
├── .env.example           # Example environment file
├── package.json
└── README.md
```

## Technologies Used

- [React](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vite.dev/) - Build tool and dev server
- [react-ga4](https://github.com/PriceRunner/react-ga4) - Google Analytics 4 for React

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
