import React, { useCallback } from 'react';
import { getUserThunk } from '../../redux/thunks/userThunks';
import { getStarredReposThunk } from '../../redux/thunks/starredReposThunks';
import { useDispatch, useSelector } from 'react-redux';

import SearchResult from '../../components/SearchResult';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import BackgroundImg1 from '../../assets/background1.png';
import BackgroundImg2 from '../../assets/background2.png';
import { Background1, Background2, Main, StyledSearchBar, Title } from './styles';

/**
 * Displays home page
 */
function Home() {
  const dispatch = useDispatch();
  const { user, starredRepos } = useSelector((state) => state);

  // handle search given `username`
  const handleSearch = useCallback(
    (username) => {
      // get user info
      dispatch(getUserThunk(username));
      // get user's starred repos
      dispatch(getStarredReposThunk(username));
    },
    [dispatch]
  );

  return (
    <div>
      <Main>
        {/* app's logo and title */}
        <Logo />
        <Title>GitHub Profile Search</Title>

        <StyledSearchBar onSearch={handleSearch} isSearching={user.loading === 'pending'} />

        {/* display search result if exists */}
        <SearchResult user={user} starredRepos={starredRepos} />

        <Background1 src={BackgroundImg1} alt="background-1" />
        <Background2 src={BackgroundImg2} alt="background-2" />
      </Main>
    </div>
  );
}

export default Home;
