import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as LocationSvg } from '../../assets/location.svg';
import { Avatar, Container, Content, BasicInfo, Link, LocationContainer, Name, NameLink, Username } from './styles';

/**
 * Presentational component that displays user's info
 */
function ProfileHeader(props) {
  const { username, name, githubUrl, bio, location, avatarUrl, followers, publicRepos } = props;
  return (
    <Container>
      <Avatar src={avatarUrl} />
      <Content>
        {/* header section */}
        <div>
          <BasicInfo>
            {/* name */}
            <div>
              <NameLink href={githubUrl} rel="noopener" target="_blank">
                <Name>{name}</Name>
                <Username>@{username}</Username>
              </NameLink>
            </div>

            {/* show location if exists */}
            {location && (
              <LocationContainer>
                <LocationSvg />
                {location}
              </LocationContainer>
            )}
          </BasicInfo>

          {/* explicit github link */}
          <Link href={githubUrl} rel="noopener" target="_blank">
            {githubUrl}
          </Link>
        </div>

        {/* subtext section */}
        <div>
          <strong>{followers}</strong> followers・<strong>{publicRepos}</strong> public repos
        </div>

        {/* show bio if exists */}
        {bio && <p>{bio}</p>}
      </Content>
    </Container>
  );
}

ProfileHeader.propTypes = {
  /** username of user */
  username: PropTypes.string.isRequired,
  /** name of user */
  name: PropTypes.string.isRequired,
  /** GitHub link of user */
  githubUrl: PropTypes.string.isRequired,
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
};

ProfileHeader.defaultProps = {
  location: '',
  bio: '',
  followers: 0,
  publicRepos: 0,
};

export default ProfileHeader;
