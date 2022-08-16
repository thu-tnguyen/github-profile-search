import '@testing-library/jest-dom';
import React from 'react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import Home from './index';

import { DEFAULT_ERROR_MSG, DEFAULT_NO_STARRED_REPO_MSG } from '../../utils/messages';
import { PARSED_REPOS_1, PARSED_USER_1, RAW_REPOS_1, RAW_USER_1 } from '../../utils/dummyData';
import {
  expectRepoListBeShownAsync,
  expectValuesBeShownAsync,
  expectValuesNotBeShown,
  fillInputAndSearch,
} from '../../utils/tests';

// render Home page with redux
const renderHomePage = () =>
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

// default request handlers which use msw to intercept the network request during the test, and return the response after delay time
// https://redux.js.org/usage/writing-tests#connected-components
const handlers = [
  // get `PARSED_USER_1` by username and return its object
  rest.get('https://api.github.com/users/' + PARSED_USER_1.username, (req, res, ctx) => {
    return res(ctx.json(RAW_USER_1), ctx.delay(150));
  }),
  rest.get(`https://api.github.com/users/${PARSED_USER_1.username}/starred`, (req, res, ctx) => {
    return res(ctx.body(RAW_REPOS_1), ctx.delay(150));
  }),
];

// define server for mocking with default handlers
const server = setupServer(...handlers);

// enable API mocking before tests
beforeAll(() => server.listen());

// reset any runtime request handlers after each test
afterEach(() => server.resetHandlers());

// disable API mocking after the tests are done
afterAll(() => server.close());

describe('Home page', () => {
  test('gets user and their starred repos from API and displays', async () => {
    const user = PARSED_USER_1;
    const repos = PARSED_REPOS_1;
    delete user.avatarUrl;

    // render testing component
    renderHomePage();

    fillInputAndSearch(user.username);

    // initially shouldn't show any info of result as req is pending
    expectValuesNotBeShown(Object.values(user));

    // eventually when request completes, every prop in object should be displayed on screen
    // ignore github url because the check for it is different
    await expectValuesBeShownAsync(Object.values(user), [user.githubUrl]);

    // should display starred repos
    await expectRepoListBeShownAsync(repos);
  });

  test('gets user and starred repos from API and displays, notify when starred repos is empty', async () => {
    const user = PARSED_USER_1;
    delete user.avatarUrl;
    delete user.id;

    // render testing component
    renderHomePage();

    // set up request for getting starred repos to return empty array
    server.use(
      rest.get(`https://api.github.com/users/${user.username}/starred`, (req, res, ctx) => {
        return res(ctx.body([]), ctx.delay(150));
      })
    );

    fillInputAndSearch(user.username);

    // initially shouldn't show any info of result as req is pending
    expectValuesNotBeShown(Object.values(user));

    // eventually when request completes, every prop in object should be displayed on screen
    // ignore github url because the check for it is different
    await expectValuesBeShownAsync(Object.values(user), [user.githubUrl]);

    // should notify that there is no starred repos
    expect(await screen.findByText(DEFAULT_NO_STARRED_REPO_MSG)).toBeInTheDocument();
  });

  test('if there is no result from API, username should be displayed once', async () => {
    const username = 'test';

    // render testing component
    renderHomePage();

    // set up request to have error
    server.use(rest.get('https://api.github.com/users/' + username, (req, res, ctx) => res(ctx.status(404))));
    server.use(rest.get(`https://api.github.com/users/${username}/starred`, (req, res, ctx) => res(ctx.status(404))));

    fillInputAndSearch(username);

    // shouldn't see username in text
    // (ignore the username in input since it won't be touched by `queryByText`)
    expect(screen.queryByText(username)).not.toBeInTheDocument();
  });

  test('if getting user from API fails, should display error message', async () => {
    // render testing component
    renderHomePage();

    // set up request to have error
    server.use(rest.get('https://api.github.com/users/test', (req, res, ctx) => res(ctx.status(500), ctx.delay(150))));
    server.use(rest.get(`https://api.github.com/users/test/starred`, (req, res, ctx) => res(ctx.status(404))));

    fillInputAndSearch('test');

    // initially shouldn't show error message
    expect(screen.queryByText(DEFAULT_ERROR_MSG)).not.toBeInTheDocument();

    // eventually show error
    expect(await screen.findByText(DEFAULT_ERROR_MSG)).toBeInTheDocument();
  });
});
