import { fireEvent, screen } from '@testing-library/react';
import { PARSED_REPOS_1 } from './dummyData';

/**
 * Fill `input` into search field and perform search
 * assuming search bar has been rendered
 * @param {string} input - input to search on
 */
export function fillInputAndSearch(input) {
  // fill input
  fireEvent.change(screen.getByLabelText('Search username'), {
    target: { value: input },
  });
  // submit form
  fireEvent.click(screen.getByTestId('search-btn'));
}

/**
 * throw error if any of the `values` is shown in document as text content
 * @param {string[]} values - values to check for existence in document
 * @param {string[]} ignoreList - list of values to ignore checking
 */
export function expectValuesNotBeShown(values = [], ignoreList = []) {
  for (const value of values) {
    // don't check if is in `ignoreList`
    if (ignoreList.includes(value)) continue;

    // otherwise should not appear
    expect(screen.queryByText(value)).not.toBeInTheDocument();
  }
}

/**
 * throw error if any of the `values` is **not shown** in document as text content
 * @param {string[]} values - values to check for existence in document
 * @param {string[]} ignoreList - list of values to ignore checking
 */
export function expectValuesBeShown(values = [], ignoreList = []) {
  for (const value of values) {
    // don't check if is in `ignoreList`
    if (ignoreList.includes(value)) continue;

    // otherwise every `value` should appear at least once
    expect(screen.getAllByText(new RegExp(value, 'i')).length).toBeGreaterThanOrEqual(1);
  }
}

/**
 * await for results and throw error if any of the `values` is **not shown** in document as text content
 * @param {string[]} values - values to check for existence in document
 * @param {string[]} ignoreList - list of values to ignore checking
 */
export async function expectValuesBeShownAsync(values = [], ignoreList = []) {
  for (const value of values) {
    // don't check if is in `ignoreList`
    if (ignoreList.includes(value)) continue;

    // otherwise await `value` and verify it should appear at least once
    expect((await screen.findAllByText(new RegExp(value, 'i'))).length).toBeGreaterThanOrEqual(1);
  }
}

/**
 * expect repos to be shown in the document ** specifically to match with `RepoList` component rendering **
 * @param {Object[]} repos - values to check for existence in document
 */
export async function expectRepoListBeShown(repos = []) {
  for (const { fullName, url } of PARSED_REPOS_1) {
    // should show full name
    expect(screen.getByText(fullName)).toBeInTheDocument();
    // full name should href to repo `url`
    expect(screen.getByText(fullName)).toHaveAttribute('href', url);
    // should have `url` and it has href to repo `url`
    expect(screen.getByText(url)).toHaveAttribute('href', url);
  }
}

/**
 * await for results and expect repos to be shown in the document ** specifically to match with `RepoList` component rendering **
 * @param {Object[]} repos - values to check for existence in document
 */
export async function expectRepoListBeShownAsync(repos = []) {
  for (const { fullName, url } of repos) {
    // should show full name
    expect(await screen.findByText(fullName)).toBeInTheDocument();
    // full name should href to repo `url`
    expect(await screen.findByText(fullName)).toHaveAttribute('href', url);
    // should have `url` and it has href to repo `url`
    expect(await screen.findByText(url)).toHaveAttribute('href', url);
  }
}
