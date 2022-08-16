import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './index';
import { PARSED_USER_1 } from '../../utils/dummyData';
import { fillInputAndSearch } from '../../utils/tests';

// input with overly long dummy string (50 chars)
const INVALID_INPUT = 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..';

describe('Search bar', () => {
  test('renders correctly', () => {
    // render without err
    render(<SearchBar />);
    // input should be empty
    expect(screen.getByLabelText('Search username')).toHaveTextContent('');
  });

  test('displays default input correctly', () => {
    render(<SearchBar defaultInput={PARSED_USER_1.username} />);
    // check input
    expect(screen.getByDisplayValue(PARSED_USER_1.username)).toBeInTheDocument();
  });

  test('calls the onSearch callback handler', () => {
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    fillInputAndSearch('test');

    // check that on search is called
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  test('when form is submitting, button is disabled', () => {
    render(<SearchBar isSearching={true} />);
    expect(screen.getByTestId('search-btn')).toBeDisabled();
  });

  test('when value is empty, button is disabled', () => {
    render(<SearchBar />);
    expect(screen.getByTestId('search-btn')).toBeDisabled();
  });

  test('when there is validation error, button is disabled', () => {
    render(<SearchBar />);
    // should have validation error
    fireEvent.change(screen.getByLabelText('Search username'), {
      target: {
        value: INVALID_INPUT,
      },
    });
    // button is disabled
    expect(screen.getByTestId('search-btn')).toBeDisabled();
  });

  test('displays error when input is too long', () => {
    // render without err
    render(<SearchBar />);
    // should have validation error
    fireEvent.change(screen.getByLabelText('Search username'), {
      target: {
        value: INVALID_INPUT,
      },
    });
    // error should be displayed
    expect(screen.getByTestId('search-input-err')).toBeInTheDocument();
  });
});
