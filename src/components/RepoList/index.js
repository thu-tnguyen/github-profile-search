import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@mui/material';
import { ExternalLink, List, ListItem, StyledAvatar, TextSection, Title } from './styles';

/**
 *  Presentational component for a list of repos
 */
function RepoList(props) {
  const { list, error } = props;

  // if there is error, display it
  if (error) return <p>{error}</p>;

  // display list of repos
  return (
    <List>
      {list.map(({ id, ownerAvatarUrl, ownerName, fullName, url }) => (
        <ListItem key={id}>
          <StyledAvatar src={ownerAvatarUrl} alt={ownerName} />
          <TextSection>
            <Title href={url} rel="noopener" target="_blank">
              {fullName}
            </Title>
            <ExternalLink href={url} rel="noopener" target="_blank">
              {url}
            </ExternalLink>
          </TextSection>
          <Divider />
        </ListItem>
      ))}
    </List>
  );
}

RepoList.propTypes = {
  /** error message to display */
  error: PropTypes.string,
  /** a list of repos */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      /** full name of repo */
      fullName: PropTypes.string,
      /** avatar url of owner */
      ownerAvatarUrl: PropTypes.string,
      /** name of owner */
      ownerName: PropTypes.string,
      /** url to repo on GitHub */
      url: PropTypes.string,
    })
  ),
};

export default RepoList;
