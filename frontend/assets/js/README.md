# Frontend JavaScript Modules

This directory contains modular JavaScript files that replace the inline scripts in the original HTML files.

## Module Structure

### Core Modules

- **api.js** - API communication layer
  - Centralized fetch wrapper
  - All backend endpoint calls
  - Error handling

- **storage.js** - LocalStorage utilities
  - Get/set helpers
  - Specific getters for app data
  - Fallback for offline mode

- **data.js** - Static data
  - Organization definitions
  - Gradients and styling constants
  - Ratings data

- **ui.js** - UI utilities
  - Fade transitions
  - Modal management
  - Share functionality

- **render.js** - HTML rendering
  - Club card templates
  - Empty state templates
  - Comment templates

- **app.js** - Core application logic
  - Authentication
  - CRUD operations
  - Event handlers
  - State management

- **views.js** - Page views
  - All tab/page rendering
  - Navigation handlers
  - View transitions

- **details.js** - Details modal
  - Event detail popups
  - Comment sections

## Usage

Include modules in HTML in this order:

```html
<script src="../assets/js/api.js"></script>
<script src="../assets/js/storage.js"></script>
<script src="../assets/js/data.js"></script>
<script src="../assets/js/ui.js"></script>
<script src="../assets/js/render.js"></script>
<script src="../assets/js/app.js"></script>
<script src="../assets/js/views.js"></script>
<script src="../assets/js/details.js"></script>
```

## Benefits

1. **Separation of Concerns** - Each module has a single responsibility
2. **Reusability** - Functions can be used across pages
3. **Maintainability** - Easier to find and fix bugs
4. **Testability** - Modules can be tested independently
5. **Readability** - Smaller, focused files
6. **No Duplication** - Shared code in one place

## Migration

- Old: `main.html` (1000+ lines of inline JS)
- New: `main-new.html` (uses modular JS)

The new version is functionally identical but much cleaner and maintainable.
