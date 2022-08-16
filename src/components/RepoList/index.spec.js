import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PARSED_REPOS_1 } from '../../utils/dummyData';
import RepoList from './index';
import { DEFAULT_NO_STARRED_REPO_MSG } from '../../utils/messages';
import { expectRepoListBeShown } from '../../utils/tests';

describe('Repo List', () => {
  test('renders correctly', () => {
    // render without err
    render(<RepoList list={PARSED_REPOS_1} />);

    // repos' fields should be shown
    expectRepoListBeShown(PARSED_REPOS_1);
  });

  test('renders error message when it is given and list is empty', () => {
    // render without err
    render(<RepoList list={[]} error={DEFAULT_NO_STARRED_REPO_MSG} />);

    // should render message
    expect(screen.getByText(DEFAULT_NO_STARRED_REPO_MSG)).toBeInTheDocument();
  });

  test('renders error message when it is given and list is not empty', () => {
    // render without err
    render(<RepoList list={PARSED_REPOS_1} error={DEFAULT_NO_STARRED_REPO_MSG} />);

    // should render message
    expect(screen.getByText(DEFAULT_NO_STARRED_REPO_MSG)).toBeInTheDocument();
  });
});
