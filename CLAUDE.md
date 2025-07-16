# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a clinic medicine search application - a simple web application with a client-side architecture consisting of:
- `index.html` - Main HTML page with basic structure
- `app.js` - JavaScript application logic (currently empty)
- `style.css` - CSS styles (currently empty)

## Project Structure

The project follows a simple flat structure:
```
/
├── index.html    # Main HTML entry point
├── app.js        # JavaScript application module
└── style.css     # CSS styles
```

## Development

This appears to be a frontend-only project using vanilla HTML, CSS, and JavaScript with ES6 modules (script type="module").

### Key Implementation Notes
- The HTML file loads `app.js` as an ES6 module
- Currently no build process or package management (no package.json)
- No external dependencies or frameworks detected
- Files are currently empty placeholders ready for implementation

### Development Commands
Since this is a vanilla web project with no build tools:
- Open `index.html` directly in a browser for development
- Use a local development server for better development experience (e.g., `python -m http.server 8000`)

## Architecture Considerations

Given the project name "Clinic_Medicine_Search", this appears to be intended as a medical/clinical search interface. The vanilla JavaScript approach suggests a lightweight, simple implementation without complex build processes.