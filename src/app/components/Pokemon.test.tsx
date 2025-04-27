import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import Pokemon from './Pokemonx';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('When the user enters a valid pokemon name', () => {
  test('should show the pokemon abilities of that pokemon', async () => {
    const abilities = [
      {
        ability: {
          name: 'Test ability 1',
          url: 'https://ability.com/ability1',
        },
      },
      {
        ability: {
          name: 'Test ability 2',
          url: 'https://ability.com/ability2',
        },
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: { abilities } });
    render(<Pokemon />);
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await userEvent.type(input, 'ditto');
    await userEvent.click(button);
    const returnedAbilities = await screen.findAllByRole('listitem');
    console.log('inputtttttttttttttttt',input)
    expect(returnedAbilities).toHaveLength(2);
  });
});

describe('When the user enters an invalid pokemon name', () => {
  test('should show an error message in the screen', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error());
    render(<Pokemon />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    await userEvent.type(input, 'invalid-pokemon-name');
    await userEvent.click(button);
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument();
  });
});
