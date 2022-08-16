import styled from 'styled-components';
import { Avatar } from '@mui/material';

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StyledAvatar = styled(Avatar)`
  width: 2.5rem !important;
  height: 2.5rem !important;
`;

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.8rem;
`;

export const TextSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.8rem;
  align-items: baseline;
`;

export const ExternalLink = styled.a`
  text-decoration: none;
  color: #1976d2;
  font-size: 0.9rem;
`;

export const Title = styled.a`
  text-decoration: none;
  color: black;
  font-weight: 600;
  &:hover {
    color: #1976d2;
  }
  // force title to be on its own line on lower screen widths for responsiveness
  @media (max-width: 768px) {
    flex: 100%;
  }
`;
