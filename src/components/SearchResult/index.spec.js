import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PARSED_REPOS_1, PARSED_USER_1 } from '../../utils/dummyData';
import SearchResult from './index';
import { DEFAULT_ERROR_MSG } from '../../utils/messages';
import { screen } from '@testing-library/react';
import { expectRepoListBeShown, expectValuesBeShown, expectValuesNotBeShown } from '../../utils/tests';

describe('Search result', () => {
  test('renders correctly if there is a result', () => {
    const user = PARSED_USER_1;
    // render without err
    render(
      <SearchResult
        user={{ data: user, loading: 'succeed' }}
        starredRepos={{ data: PARSED_REPOS_1, loading: 'succeed' }}
      />
    );

    // should display user data
    // ignore data that requires special checking
    expectValuesBeShown(Object.values(user), [user.githubUrl, user.avatarUrl]);

    // should display repos data
    expectRepoListBeShown(PARSED_REPOS_1);
  });

  test('renders error instead of result if getting user fails', () => {
    render(
      <SearchResult
        user={{ data: PARSED_USER_1, loading: 'fail', error: DEFAULT_ERROR_MSG }}
        starredRepos={{ data: PARSED_REPOS_1, loading: 'succeed' }}
      />
    );

    // error should be displayed
    expect(screen.getByText(DEFAULT_ERROR_MSG)).toBeInTheDocument();

    // user result data should not appear
    expectValuesNotBeShown(Object.values(PARSED_USER_1));

    // repos result data should not appear
    for (const { fullName, url } of Object.values(PARSED_REPOS_1)) {
      expect(screen.queryByText(fullName)).not.toBeInTheDocument();
      expect(screen.queryByText(url)).not.toBeInTheDocument();
    }
  });

  test('renders error instead of result if getting starred repos fails', () => {
    render(
      <SearchResult
        user={{ data: PARSED_USER_1, loading: 'succeed' }}
        starredRepos={{ data: PARSED_REPOS_1, loading: 'fail', error: DEFAULT_ERROR_MSG }}
      />
    );

    // error should be displayed
    expect(screen.getByText(DEFAULT_ERROR_MSG)).toBeInTheDocument();

    // user result data should not appear
    expectValuesNotBeShown(Object.values(PARSED_USER_1));

    // repos result data should not appear
    for (const { fullName, url } of Object.values(PARSED_REPOS_1)) {
      expect(screen.queryByText(fullName)).not.toBeInTheDocument();
      expect(screen.queryByText(url)).not.toBeInTheDocument();
    }
  });
});
