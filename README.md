# Pier 2 Imports OrderTrack

Welcome to Pier 2 Imports OrderTrack, a customer-facing order tracking dashboard that allows customers to view their order history, track order statuses, and see estimated delivery dates.

[Try out OrderTrack.](https://pier-2-imports.vercel.app/) Searching for email `user1@example.com` will yield results.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Save the environment variables [in this gist](https://gist.github.com/pickles27/07f564a7c39445eeea5a3df5a488c242) into a `.env.local` file in the app root. This is just a dev database with some mock data - would not do this in prod 😅

Then, install the dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Running unit tests

This project uses [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) for unit testing.

To run the tests:

```bash
pnpm test
```

or to run in watch mode:

```bash
pnpm test:watch
```
