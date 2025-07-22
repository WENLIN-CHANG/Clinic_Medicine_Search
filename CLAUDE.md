# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a clinic medicine search application - a web application for "新螺安診所" (Xinluoan Clinic) with a client-side architecture consisting of multiple pages for drug search and storage management.

## Project Structure

```
/
├── html/
│   ├── index.html              # Homepage with search interface
│   ├── search_result.html      # Search results page
│   └── storage_location.html   # Storage location selection page
├── css/
│   ├── style.css               # Homepage CSS styles
│   ├── search_result.css       # Search results page styles
│   └── storage_location.css    # Storage location page styles
├── js/
│   ├── app.js                  # Homepage JavaScript logic
│   ├── search_result.js        # Search results page JavaScript
│   └── storage_location.js     # Storage location page JavaScript
├── img/
│   └── 新螺安背景.jpg           # Clinic background image
├── package.json                # Project configuration and dependencies
├── commit_message_rule.md      # Git commit message standards
└── CLAUDE.md                   # This file
```

## Page Navigation Flow

1. **Homepage (html/index.html)**: Search interface with centered search box and "搜尋" button
2. **Search Results (html/search_result.html)**: Displays drug information and cabinet grid
3. **Storage Location (html/storage_location.html)**: Cabinet location selection interface

## Key Features Implemented

### Homepage (html/index.html)
- Centered search interface with title "新螺安診所藥物查詢系統"
- Search input with placeholder "請輸入藥品中文名或英文名"
- Clear button (×) functionality
- Search button with gradient styling
- Enter key support for search
- Blurred clinic background image

### Search Results (html/search_result.html)
- Single column layout (previously had right column, now removed)
- Cabinet section at top with 3×4 grid, each cell divided into 4 sub-cells
- Drug image display area
- Drug details section with:
  - Drug name (Chinese and English)
  - Common dosage
  - Collapsible side effects section
  - Package insert link (opens in new window)
  - Director's common dosage
- "儲存位置" button linking to storage_location.html
- All h2 headings are centered

### Storage Location (html/storage_location.html)
- Current drug information display
- Left cabinet: 5×1 table (L1-L5)
- Right cabinet: 4×1 table (R1-R4)
- Simple cell structure (no sub-grids)
- Click feedback animation
- Return button to search results

## Development

This is a frontend-only project using vanilla HTML, CSS, and JavaScript with ES6 modules.

### Key Implementation Notes
- All pages use the same background image with blur effect
- Consistent styling with semi-transparent white containers
- Responsive design with mobile support
- No external dependencies or frameworks
- Module-based JavaScript architecture

### Development Commands
- `npm run dev` - Start Vite development server (recommended for development)
- Alternative: Open `html/index.html` directly in a browser for quick testing

## Styling Guidelines

- Background: Blurred clinic image
- Container: Semi-transparent white with backdrop-filter
- Colors: Blue (#4285f4) for primary elements, Orange (#ff9800) for storage buttons
- Typography: Arial font family
- Buttons: Rounded corners with hover effects and shadows

## JavaScript Functionality

Each page has its own JavaScript file with specific functionality:

### js/app.js (Homepage)
- Search input handling with Enter key support
- Clear button functionality
- Basic search logging (no actual search implementation yet)

### js/search_result.js
- Return to homepage navigation
- Collapsible side effects section toggle
- Navigation to storage location page

### js/storage_location.js
- Return to search results navigation
- Cabinet cell click handling with visual feedback
- Console logging of selected storage locations

## Git Commit Convention

This project follows a specific commit message format. See `commit_message_rule.md` for detailed guidelines:
- Use types: feat, modify, fix, docs, style, refactor, test, chore, revert
- Format: `TYPE: SUBJECT` with optional body and footer
- Subject should be under 50 characters, start with capital letter