import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchSvg } from '../../assets/search.svg';
import { Button, ErrorMsg, Form, SearchInput } from './styles';
import { CircularProgress } from '@mui/material';

// GitHub's max username length for input validation
const MAX_LENGTH_USERNAME = 39;

/**
 * Presentational component for search bar
 */
function SearchBar(props) {
  const { defaultInput, onSearch, isSearching, className } = props;
  // search input state
  const [input, setInput] = useState(defaultInput);
  // validation error (string) state
  const [validationErr, setValidationErr] = useState('');

  // update input state value
  function handleChange(e) {
    setInput(e.target.value);
  }

  // validate input
  useEffect(() => {
    // if invalid
    if (input.length >= MAX_LENGTH_USERNAME) setValidationErr("Username can't be longer than 39 characters");
    // if valid, clear error state
    else if (validationErr) setValidationErr('');
  }, [input, validationErr]);

  return (
    <div className={className}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(input);
        }}
      >
        <SearchInput
          fullWidth
          label="Search username"
          variant="outlined"
          value={input}
          onChange={handleChange}
          // true if `validationErr` has value
          error={!!validationErr}
        />

        <Button
          type="submit"
          data-testid="search-btn"
          // button is disabled when loading OR when input is empty OR when there's error
          disabled={isSearching || !input || !!validationErr}
        >
          {/* when loading, display progress icon */}
          {isSearching ? <CircularProgress /> : <SearchSvg />}
        </Button>
      </Form>

      {/* display error if it applies */}
      {validationErr && <ErrorMsg data-testid="search-input-err">{validationErr}</ErrorMsg>}
    </div>
  );
}

SearchBar.propTypes = {
  /** default search input */
  defaultInput: PropTypes.string,
  /** function called when search button is clicked */
  onSearch: PropTypes.func,
  /** whether search is loading */
  isSearching: PropTypes.bool,
};

SearchBar.defaultProps = {
  defaultInput: '',
  isSearching: false,
  onSearch: () => {},
};

export default SearchBar;
