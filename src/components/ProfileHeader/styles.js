import styled from 'styled-components';
import { Avatar as MuiAvatar } from '@mui/material';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  column-gap: 2.6875rem;
  row-gap: 2rem;
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex-grow: 1;
  row-gap: 1rem;
`;

export const BasicInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 0.5rem;
  align-items: baseline;
`;

export const Name = styled.span`
  font-size: 2rem;
  font-weight: 600;
`;

export const Username = styled.span`
  font-size: 1.5rem;
  font-weight: 400;
  padding: 0 0.5rem;
`;

export const Avatar = styled(MuiAvatar)`
  width: 13.25rem !important;
  height: 13.25rem !important;
`;

export const LocationContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.65rem;
  color: rgba(0, 0, 0, 0.8);
  align-items: center;
  font-weight: 500;
`;

export const NameLink = styled.a`
  text-decoration: none;
  color: black;
  &:hover {
    color: #1976d2;
  }
`;
export const Link = styled.a`
  text-decoration: none;
  color: #1976d2;
`;
