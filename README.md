# GitHub Profile Search

An app that displays information about a GitHub user from the GitHub API.

## How do I run this app locally?

In the project's directory:

1. Install packages by running: `npm install`

2. Runs the app in the development mode with: `npm start`

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## How do I test this app?

You can test this app by either:

1. Run the app locally and perform manual testing by interacting via the browser
2. Run unit tests by running `npm test` in project's directory

## How is Redux structured?
This app uses `Redux Toolkit`. All Redux-related files are within `./src/redux` folder, with all `reducers` and
`thunks`(or actions) in their respective folders.

### Store

Redux store is configured minimally using `Redux Toolkit`'s `configureStore`, which already contains some
[default middlewares](https://redux-toolkit.js.org/api/getDefaultMiddleware) containing Redux thunk.

### Actions and reducers

Reducers are created with `createSlice`, while async action handling is done by using
`createAsyncThunk`.

### How do you keep track of loading states, API errors, and data?

This app uses "state machine" approach:
1. All reducers start with **idle** `loading` state.
2. Once the action is dispatched, it switches to **pending**
3. As the API call finish running, `loading` state becomes **succeed** or **fail**, depending on
   API call result.

```
idle -> pending -> succeed/fail
```

In the case where it **succeeds**, the payload is saved to the state. Whereas if it **fails**, the `error` is stored.

## What are some future improvements?
Certain improvements can be made for both a better user experience and a better codebase. Some of them are:

### Codebase
* Create a middleware for reducers—with schema including common state fields like `loading` and `error`
    * This should also regulate different `loading` states and `loading`'s "state machine" approach. This is to avoid
      possible mistakes arising from inconsistent use of these common states (esp. `loading`) as the codebase grows.
* More tests—there are always more test and edge cases to explore
    * One place to add more tests is with Redux store and reducers. Though [per recommendation in Redux documentation](https://redux.js.org/usage/writing-tests#integration-testing-connected-components-and-redux-logic)
      and due to the simplicity of this app, I focused mainly on integration testing for Redux-connected React components.
      Regardless, testing stores and reducers can be a good idea.

### Features
* Search input being reflected on url (e.g. as query params). This means a user can copy the link to a user
  search result and send to their friends!
* Search input typeahead with debouncing
* Skeleton loader
 