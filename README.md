# Bettermode challenge project

The project was made in response to the [challenge](https://bettermode.notion.site/Senior-Front-End-Engineer-485a0725e4d940c3a01fafe2b5154598) proposed by Bettermode for the Senior Front-end Engineer position.

Objectives of the challenge are as listed below:

- [x] Post Gallery
- [x] Post Details
- [x] Post Like/Unlike
  - With restrictions for guest users
- [x] Graphql Integration
- [x] SSR (optional)
- [x] Session Management (optional)
  - Login/Logout functionality with guest token retrieval for SSR
- [x] Unit Tests (optional)

Additional features included are:

- [x] Post Follow/Unfollow
  - Without restrictions for guest users to showcase error handling
- [x] Post Replies
  - With restrictions for guest users
  - Without the compose functionality due to time constraints

## Usage

Create a new `.env.local` file in the root of the project using the `.env.example` file as a reference. The values already set in the `.env.example` file can be used to avoid creating new website.

Please make sure to install dependencies before running the project.

```bash
npm install
npm run dev
```

These commands can be used to create and run a production version:

```bash
npm run build
npm run server
```

Visit [http://localhost:5173](http://localhost:5173) to view the project.

## Project structure

Project structure somewhat follows the previous Nextjs structure, where pages are stored in `/src/pages` and components are categorically stored in `/src/components`. The `/src/contexts` directory contains the context definitions and components used in the project.

The `/src/graphql` directory contains the graphql queries and mutations used in the project. You will notice queries are not defined per Apollo documentation and the reason is easier syntax highlighting. The queries are copied from the network requests made in the actual website created in Bettermode.

Tests, where available, are next to the component they are testing, named as `*.test.tsx`.

## Inspirations

This project was made using Vite, React, Tailwindcss, Apollo. Some components are developed or copied from Shadcn. The SSR functionality is developed combining code from documentation of Vite and Apollo.

Here are useful links to the documentation of the technologies used in this project:

- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
  - [Vite SSR](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react)
  - [Vitest](https://vitest.dev/)
- [Apollo](https://www.apollographql.com/)
  - [Apollo SSR](https://www.apollographql.com/docs/react/performance/server-side-rendering)
  - [Apollo Testing](https://www.apollographql.com/docs/react/development-testing/testing)
- [Shadcn](https://ui.shadcn.com/)
- [Sonner](https://github.com/emilkowalski/sonner)
  - [Shadcn Implementation](https://ui.shadcn.com/docs/components/sonner)
