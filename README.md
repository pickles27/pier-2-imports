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

## Technical Decisions

At a high level, we must enable users to:

- Search for their orders using their email or phone number.
- View a list of past orders and their details.
- Track an order’s current status and estimated delivery date.

Users don’t need to add both email and phone number, but if they do, it’s possible that they entered one of them incorrectly. We should return any orders that match either the email or phone number, and not expect any of the orders to match both of them.

Order details are not displayed until the order is clicked, so they will be fetched at that time.

### Application Framework

To minimize the amount of time spent on application setup, `create-next-app` will be used for this project. This enables us to spin up a React app in just a few seconds with route handling, TypeScript, Tailwind CSS, ESLint, and many other built-in feature and optimizations that we’d have to spend time supporting otherwise (or opt-out of).

**Decision**: Next.js

### JavaScript vs. TypeScript

TypeScript is effortless to set up with `create-next-app` and provides the benefit of static type checking, providing early error detection and documentation in the form of types.

**Decision**: TypeScript

### Styling

Tailwind CSS comes out of the box with `create-next-app` and allows devs to style components with very little typing and provides utility classes that make theming and responsive design nearly effortless. This comes at the cost of readability - Tailwind is notorious for encouraging giant classname strings in the components.

I considered using MUI, but there were only a few simple design system-type components needed. Since Tailwind comes out-of-the-box with `create-next-app` , this approach enabled a faster app setup. Styled Components was another option, but I find it to be more verbose than Tailwind and it creates a lot of extra components that can make component files excessively long and difficult to read.

**Decision**: Tailwind CSS

### Testing

If I had more time, full e2e testing using something like Playwright with a real database would be valuable to add since it enables us to test the complete integration of the code in various types of browsers (webkit, chromium etc), and ensure regressions are not introduced as the app evolves.

Due to time constraints, and to avoid having to set up mocking, I will be utilizing a container pattern and testing the presentational components instead of doing proper integration tests. I chose Jest thanks to it’s [simple integration with Next.js](https://nextjs.org/docs/app/building-your-application/testing/jest) and the fact it’s a ubiquitous JS testing framework. but I would have chosen Vitest if the app was a Vite application, especially if the app was large and contained a lot of tests. Along with Jest, I opted to use React Testing Library and User Event so that our tests could more closely resemble real user interactions, and also because using RTL encourages building components with accessibility in mind (encourages elements by role, for example).

If I had more time, I’d also like to set up Axe accessibility testing as well, but didn’t have time.

**Decision**: Test presentational components using Jest and React Testing Library, and for this MVP, rely on manual testing for full integration testing. 😩

### State Management

The app is very simple and mostly just passes the fetched data down a level or two in the component tree, so I felt a solution like Redux would be unnecessary.

**Decision**: Wherever possible, use Server Components to fetch data and pass to presentational components. Rely on Next.js fetch caching and application state for now.

### Storage

Since I am using Next.js for this application and Vercel to handle deployments, I’ve used Vercel’s Storage integration with Neon Serverless - Postgres for this project. I was able to run [this SQL](./db/schema.sql) directly in the Neon dashboard to generate the tables and seed the database with mock data.

I chose Postgres because it's a ubiquitous tool that supports relational databases. This project is using a REST api and the data is structured, so I thought that would be appropriate.

#### Indexing

I added indexes to the email and phone columns on the orders table since those are the parameters we are searching for orders by (that and the primary key which is already indexed by Postgres by default).

```sql
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_phone ON orders(phone);
```

### Mock Data Generation

Used ChatGPT to generate mock data and inserted using the Neon SQL Editor.

## Usage of LLMs

I utilized ChatGPT while building this app to brainstorm ideas and help me with debugging issues, but I write my own code (I find it can take longer overall when leaning on ChatGPT for writing code since there are almost always quality issues and bugs that need to be fixed). I leaned on ChatGPT more heavily when designing the db tables and writing the SQL commands to handle all the JOINs when fetching order details - I have leaned heavily towards the front-end in my work for the past few years so I didn't have the muscle memory to knock that query out quickly..😅

## Future Improvements

- Support filtering or sorting orders
- Add order tracking progress bar
- Vastly improve test coverage
- Generate types based on db schema instead of maintaining the types in [app/lib/definitions.ts](./src/app/lib/definitions.ts) (and risking divergence) - Prisma perhaps?
- Use fancier Accordion component for expanding order details - the approach I’m using does not support closing the accordions
- Add masking to phone number input
- Order List pagination (would only really be necessary if users tended to have a large number of orders)
- Better error handling - errors presented to the user are currently very generic and are not utilizing any sort of error codes.
- Improved accessibility - maybe utilize a headless component library like Radix.
- Add toggle for dark mode (very easy to support dark mode with Tailwind theming - I was supporting system preference at first, but in the interest of cutting scope I disabled the dark mode by commenting out the styles in the [globals.css](./src/app/globals.css) file.
- Build home page if we wanted to add more features to OrderTrack (currently `/` always redirects to `/orders` page)
