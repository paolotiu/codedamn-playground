# Code playground

## Prerequesites

- Redis Installed in your machine
- MongoDB Atlas URL

## Installation

First, install the dependecies

```js
  cd server
  yarn
  cd ../web
  yarn
```

Next, confirm tests are passing for the server

```
 # In the server directory

 yarn test

 # All tests should be passing
```

## Configuring .env files

Each folder will have their own .env.example files that you can should fill up.
The pre-filled ones should be okay, except for the `DB_URL`.
For that you need to put your own mongodb atlas url.

In the web directory rename `.env.example` to `.env.local`.
And in the server directory rename `.env.example` to `.env`

## Running the app

For the server

```
  # In the server directory
  yarn dev

  Running on http://localhost:4000/graphql
```

Now, for the frontend

```
 # In the web directory

 yarn dev

 Running on http://localhost:3000

```
