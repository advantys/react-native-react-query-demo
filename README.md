# React Native - React Query - Hasura - demo app 

A basic React Native app to demonstrate [React Query](https://react-query.tanstack.com/) with [GraphQL Code generator](https://www.graphql-code-generator.com/) features. 

The GraphQL API is powered by [Hasura](https://hasura.io).

## React Native EU Conference 2021 Talk

[React Native Europe Conference 21 replay](https://www.youtube.com/watch?v=Kt--iBUQcww&t=22102s)

The app folders structure has been updated in this repo compared to the version demonstrated in the talk.

GraphQL subscription support example has been added.

## Full Stack
### Front-end
- Expo
- Typescript
- GraphQL code generator with graphql-config
- React Query & graphql-request
- React Native Paper
- React Navigation
- Suspense and Error boundaries

### Backend
- Hasura with Postgres

## Requirements

- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) (SDK 42)
- [Docker](https://docs.docker.com/desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

```sh
  yarn install
```

### Optional
- [GraphQL VS code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) 
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/index.html)

## Local developement

### 1. Start the GraphQL API

To start Hasura with Postgres run:

```sh
  # Run Hasura
  yarn hasura:up

  # Stop Hasura
  yarn hasura:down

  # Display Hasura logs
  yarn hasura:logs

  # Launch the console using Hasura CLI or go to http://localhost:8080
  yarn hasura:console

```

To start Hasura with Postgres on Apple Silicon (M1) run:

```sh
  # Run Hasura
  yarn hasura:arm64:up

  # Stop Hasura
  yarn hasura:arm64:down

  # Display Hasura logs
  yarn hasura:arm64:logs

  # Launch the console using Hasura CLI or go to http://localhost:8080
  yarn hasura:arm64:console
```

Hasura will create the demo database and the associated metadata during its first launch.
You can open the Hasura console at this address http://localhost:8080.

### 2. Start the Expo app

To start the Expo app run (Hasura must be up with the initial migrations done):

```sh
  # Expo start
  yarn start

  # Run on iOs simulator
  yarn ios

  # Run on Android emulator
  yarn android

  # Run in web browser (experimental)
  yarn web
```

To test the App on your mobile device you need to change the GraphQL API address in:
`./src/providers/GraphQLClientProvider.tsx`

Replace `localhost` with your local IP address:
```ts
const initialState: GraphQLClientState = {
  graphQLClient: new GraphQLClient('http://locahost:8080/v1/graphql', {
    headers: {
      //authorization: '',
    },
  }),
};
```

## GraphQL code generator

To generate types and operations with GraphQL code generator (Hasura must be up):

```sh
  yarn generate
```

## Features
- [X] Stale-While-Revalidate 
- [X] Using GraphQL code generator to generate the Typescript types and custom hooks for the React Query operations
- [X] Initial data
- [X] Automatic re-fetch options
  - [X] On app focus
  - [X] On network status change
  - [X] On screen focus
  - [X] Polling
- [X] Mutations
  - [X] Cache invalidation
  - [X] Optimistic updates
- [X] React Suspense and Error boundaries support
- [X] FlatList with infinite queries
- [X] Cache persistence in the Async storage
- [X] GraphQL subscriptions
- [X] 100% test code coverage (`main` branch only)

## Branches
- `main` Demo app with infinite list, async storage persistor and optimistic updates
- `simple-list` Demo app using a simple movies FlatList
- `movies-list-optimistic-update` The movies list is optimistically updated after a movie mutation 
- `graphql-subscriptions` the movie details screen is updated with GraphQL subscriptions

## Notes
- This app uses many auto-refetch and cache invalidation possibilities but you may have to select the ones you really need for your app in production.
- The infinite list implemented for this demo app has no limit on the number of pages, the auto-refetch and app performance will be impacted when a lot of pages are loaded.
- Since React Query version 3.20 you can decide which pages should be refetched with `infiniteQuery`.
- To burst the async storage cache, you have to change the `version` property value in the `package.json` file.
- No GraphQL API authentication and authorization have been implemented in this demo.
- React Native Web support is experimental.
- Console logs are verbose for demo purposes.
- More info about WebSocket support in this article [React Query can be used with web sockets](https://tkdodo.eu/blog/using-web-sockets-with-react-query).
