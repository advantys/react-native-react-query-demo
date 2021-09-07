# React Native - React Query - Hasura - demo app 

A basic React Native app to demonstrate [React Query](https://react-query.tanstack.com/) with [GraphQL Code generator](https://www.graphql-code-generator.com/) features. 
The GraphQL API is powered by [Hasura](https://hasura.io).

## React Native EU Conference 2021 Talk

[React Native Europe Conference 21 replay](https://www.youtube.com/watch?v=Kt--iBUQcww&t=22102s)

The app folders structure has been updated in this repo compared to the version demonstrated in the talk.

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

## Installation

```sh
  yarn install
```

### Optional
- [GraphQL VS code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) 
- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/index.html).

## Local developement

To start Hasura with Postgres run:

```sh
  yarn hasura:up

  # Display Hasura logs
  yarn hasura:logs

  # Launch the console using Hasura CLI or go to http://localhost:8080
  yarn hasura:console

  # Stop Hasura
  yarn hasura:down
```

Hasura will create the demo database and the associated metadata during its first launch.

To start the Expo app run:

```sh
  yarn start

  # Run on iOs simulator
  yarn ios

  # Run on Android emulator
  yarn android

  # Run in web browser (experimental)
  yarn web
```

To generate the GraphQL types and operations with GraphQL code generator:

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

## Notes
- This app uses many auto-refetch and cache invalidation possibilities but you may have to select the ones you really need for your app in production.
- The infinite list implemented for this demo app has no limit on the number of pages, the auto-refetch and app performance will be impacted when a lot of pages are loaded.
- Since React Query version 3.20 you can decide which pages should be refetched with `infiniteQuery`.
- To burst the async storage cache, you have to change the `version` property value in the `package.json` file.
- No GraphQL API authentication and authorization have been implemented in this demo.
- React Native Web support is experimental.
- Console logs are verbose for demo purposes.
- GraphQL subscriptions are not demonstrated in this app but [React Query can be used with web sockets](https://tkdodo.eu/blog/using-web-sockets-with-react-query).
