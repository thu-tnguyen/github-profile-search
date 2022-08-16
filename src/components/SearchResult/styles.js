import styled from 'styled-components';
import { Divider, Paper } from '@mui/material';

export const ErrorImg = styled.img`
  width: 65vw;
  max-width: 40rem;
  flex-grow: 1;
`;

export const ErrorContainer = styled(Paper)`
  display: flex;
  align-items: center;
  margin: 3rem 0;
  padding: 2rem;
  // responsive display
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const StyledPaper = styled(Paper)`
  margin: 3rem 0;
  padding: 2rem;
`;

export const StyledDivider = styled(Divider)`
  margin: 1.7rem 0 !important;
`;

export const Heading = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.4rem;
  margin: 1.5rem 0;
  color: #2c2b44;
`;
