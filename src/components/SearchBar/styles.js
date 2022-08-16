import styled from 'styled-components';
import { IconButton, TextField } from '@mui/material';

export const Form = styled.form`
  position: relative;
`;

export const Button = styled(IconButton)`
  position: absolute !important;
  right: 1rem;
  // center vertically
  top: 50%;
  transform: translateY(-50%);
  // if button is disabled, lower opacity of itself and descendants
  &,
  & * {
    opacity: ${(props) => (props.disabled ? '.65' : '1')};
  }
`;

export const SearchInput = styled(TextField)`
  & div {
    border-radius: 99rem !important;
    padding-right: 3rem;
  }
`;

export const ErrorMsg = styled.div`
  color: #d32f2f;
  font-weight: 500;
  font-size: 0.865rem;
  padding: 0.5rem;
`;
