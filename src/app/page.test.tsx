import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getUser } from '@/utilis/get-user';
import Home from './page';

jest.mock('../utilis/get-user.ts');
const mockedGetUser = jest.mocked(getUser, {shallow:true});

describe('When everything is OK', () => {
  beforeEach(async () => {
    render(<Home />);
    await waitFor(() => expect(mockedGetUser).toHaveBeenCalled());
  });
  test('should render the App component without crashing', () => {
    screen.debug();
  });

  test('should select the children that is being passed to the CustomInput component', () => {
    screen.getAllByText(/Input/);
  });

  test('should select the input element by its role', () => {
    screen.getAllByRole('textbox');
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
    expect(screen.getAllByRole('textbox').length).toEqual(1);
  });

  test('should select a label element by its text', () => {
    screen.getByLabelText('Input:');
    screen.debug();
  });

  test('should select input element by placeholder text', () => {
    screen.getAllByPlaceholderText('Example');
  });

  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole('whatever')).toBeNull();
  });
});

describe('When the component fetches the user successfully', () => {
  beforeEach(() => {
    mockedGetUser.mockClear();
  });

  test('should call getUser once', async () => {
    render(<Home />);
    await waitFor(() => expect(mockedGetUser).toHaveBeenCalledTimes(1));
  });

  test('should render the username passed', async () => {
    const name = 'John';
    mockedGetUser.mockResolvedValueOnce({ id: '1', name });
    render(<Home />);
    expect(screen.queryByText(/Username/)).toBeNull();
    expect(await screen.findByText(/Username/)).toBeInTheDocument();
    expect(await screen.findByText(`Username: ${name}`)).toBeInTheDocument();
  });
});

describe('When the user enters some text in the input element', () => {
  test('should display the text in the screen', async () => {
    render(<Home />);
    await waitFor(() => expect(mockedGetUser).toHaveBeenCalled());

    expect(screen.getByText(/You typed: .../));

    await userEvent.type(screen.getByRole('textbox'), 'David');

    expect(screen.getByText(/You typed: David/));
  });
});
