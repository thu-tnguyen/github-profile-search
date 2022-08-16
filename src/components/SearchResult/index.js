import React from 'react';
import PropTypes from 'prop-types';

import { Container, Typography } from '@mui/material';

import ProfileHeader from '../ProfileHeader';
import RepoList from '../RepoList';

import ErrorJpg from '../../assets/error.png';
import { ReactComponent as StarSvg } from '../../assets/star.svg';
import { ErrorContainer, ErrorImg, Heading, StyledDivider, StyledPaper } from './styles';
import { DEFAULT_NO_STARRED_REPO_MSG } from '../../utils/messages';

/**
 * Presentational component that displays search results if they has been successfully received
 * Also displays error if there's any
 */
function SearchResult(props) {
  const { user, starredRepos } = props;

  // if either user info or user's starred repos fails to load, just displays error screen
  if (user.loading === 'fail' || starredRepos.loading === 'fail') {
    return (
      <Container>
        <ErrorContainer elevation={3}>
          <ErrorImg src={ErrorJpg} alt="error-img" />
          {/* displayed error message is the error message of whichever result data that failed */}
          <Typography variant="h5">{user.loading === 'fail' ? user.error : starredRepos.error}</Typography>
        </ErrorContainer>
      </Container>
    );
  }

  // don't display results if they haven't been loaded
  if (
    user.loading === 'idle' ||
    user.loading === 'pending' ||
    starredRepos.loading === 'idle' ||
    starredRepos.loading === 'pending'
  )
    return;

  // if succeeded, display results
  return (
    <Container>
      <StyledPaper elevation={3}>
        {/* user info section */}
        <ProfileHeader {...user.data} />

        <StyledDivider />

        {/* user recently starred repos section */}
        <Heading>
          <StarSvg />
          <span>10 Most recently starred repos</span>
        </Heading>

        <RepoList
          list={starredRepos.data}
          // if list is empty, display default empty state message
          error={starredRepos.data.length === 0 ? DEFAULT_NO_STARRED_REPO_MSG : ''}
        />
      </StyledPaper>
    </Container>
  );
}

SearchResult.propTypes = {
  /** user info search result */
  user: PropTypes.shape({
    /** loading state of search result */
    loading: PropTypes.oneOf(['idle', 'pending', 'succeed', 'fail']).isRequired,
    /** error message for search result */
    error: PropTypes.string,
    /** search result data */
    data: PropTypes.shape({
      /** username of user */
      username: PropTypes.string,
      /** name of user */
      name: PropTypes.string,
      /** GitHub link of user */
      githubUrl: PropTypes.string,
      /** bio of user */
      bio: PropTypes.string,
      /** user's location */
      location: PropTypes.string,
      /** url to user's profile pic */
      avatarUrl: PropTypes.string,
      /** number of followers user has */
      followers: PropTypes.number,
      /** number of public repos user has */
      publicRepos: PropTypes.number,
    }),
  }),
  /** repos search result */
  repos: PropTypes.shape({
    /** loading state of search result */
    loading: PropTypes.oneOf(['idle', 'pending', 'succeed', 'fail']).isRequired,
    /** error message for search result */
    error: PropTypes.string,
    /** search result data */
    data: PropTypes.shape({
      /** full name of repo */
      fullName: PropTypes.string,
      /** avatar url of owner */
      ownerAvatarUrl: PropTypes.string,
      /** name of owner */
      ownerName: PropTypes.string,
      /** url to repo on GitHub */
      url: PropTypes.string,
    }),
  }),
};

export default SearchResult;
