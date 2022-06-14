import { render, screen } from 'utils/test-utils';

import Auth from '.';

describe('<Auth />', () => {
  it('should render all components and children', () => {
    render(
      <Auth title="Sign in">
        <input type="text" />
      </Auth>,
    );

    expect(screen.getAllByRole('img', { name: 'Won Games' })).toHaveLength(2);

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
