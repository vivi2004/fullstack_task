# Mini Client Dashboard (React)

This is a small React dashboard that lists users and lets you view details — similar to what you’d see in a basic SaaS admin panel.

## Features

- Users dashboard
  - Fetches users from `https://jsonplaceholder.typicode.com/users`
  - Displays users in a responsive card grid
  - Shows name, email, and a derived status (Active/Inactive)
- User details modal
  - Opens on click
  - Shows name, email, phone, website, and company name
- States handled
  - Loading (skeleton cards)
  - Empty state (no users)
  - Error state (retry)
- Bonus
  - Search by name/email
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

## What I’d Improve With More Time

- Add pagination and/or server-side search (for larger datasets)
- Add more robust error messages (surface HTTP codes, provide “Try again later” copy)
- Add basic tests (React Testing Library) for loading/error/empty states
- Add routing (`/users/:id`) as an alternative to the modal
