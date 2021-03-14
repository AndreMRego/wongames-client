import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import Auth from '.';

describe('<Auth />', () => {
  it('should render all components and children', () => {
    renderWithTheme(
      <Auth title="Sign in">
        <input type="text" />
      </Auth>,
    );

    expect(screen.getAllByLabelText(/Won Games/i)).toHaveLength(2);

    expect(
      screen.getByRole('heading', {
        name: /All your favorite games in one place/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /is the best and most complete gaming/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Won Games 2020 Todos os Direitos Reservados'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: /Sign in/i,
      }),
    ).toBeInTheDocument();

    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });
});
