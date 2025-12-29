# Mini Client Dashboard.

This is a small React dashboard that lists users and lets you view details — similar to what you’d see in a basic SaaS admin panel.

## Features

- Users list (responsive card layout)
  - Name, email, status
  - Loading state (skeleton cards)
  - Empty state
  - Error state + retry
- User details modal
  - Name, email, phone, website, company
  - Loading + error state
- Search by name/email
- Pagination (6 items per page)
- Add Mock User form (frontend-only)
- Subtle hover/transition effects

## How to run

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (usually `http://localhost:5173`).

## Tech Stack

- React (functional components + hooks)
- Vite
- Plain CSS (no full-layout UI libraries)
- `fetch` for API calls

## Project Structure

```
src/
  api/           # API calls (jsonplaceholder)
  hooks/         # data hooks (useUsers, useUser)
  components/    # reusable UI pieces (Modal, Button, etc.)
  App.jsx        # dashboard page
  App.css        # dashboard styles
  index.css      # global styles
```

## Notes / assumptions

The JSONPlaceholder API doesn’t provide an explicit `status`, so status is **derived** deterministically:
- Odd `id` => `Active`
- Even `id` => `Inactive`
The dashboard is implemented as a single page with a modal for details (keeps UX fast and simple).
Network calls are cancellable via `AbortController` to avoid setting state on unmounted components.

## What I’d Improve If I had more time

- Add server-side pagination/search (for larger datasets)
- Add route-based details (`/users/:id`) in addition to the modal
- Add a small test suite for the state handling (loading/error/empty)
- Persist mock users to localStorage so they survive page reload
