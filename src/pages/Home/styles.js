import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';

export const Main = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

export const Title = styled.h1`
  color: #2c2b44;
  text-align: center;
`;

export const StyledSearchBar = styled(SearchBar)`
  width: 65vw;
  max-width: 40rem;
`;

export const Background1 = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  width: 30vw;
`;

export const Background2 = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 30vw;
`;
