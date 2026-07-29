# CivicEye Centralized Role-Based Authentication & Authorization System

This folder contains the core shared modules driving the front-end authentication, permission controls, route guards, and dynamic navigation rendering for CivicEye.

## Shared Modules Structure

- **`constants.js`**: Holds app-wide constants, user roles (`citizen`, `officer`, `admin`), storage keys, and initial redirect mappings.
- **`storage.js`**: Abstract wrapper for `sessionStorage` and `localStorage` interactions, ensuring persistence settings like "Remember Me" are respected cleanly.
- **`auth.js`**: Drives login sessions, logs out users cleanly, manages storage states, and yields user profiles.
- **`permissions.js`**: Central repository defining exact page names authorized for each role.
- **`routeConfig.js`**: Flags public/protected routes and handles redirect mapping.
- **`roleGuard.js`**: Synchronously executed in the `<head>` to verify active login and role access, preventing "flash" of unauthorized content.
- **`navigation.js`**: Dynamically compiles the `PAGES` object and `SIDEBAR_ORDER` depending on the logged-in role, ensuring unauthorized UI components are never generated.
