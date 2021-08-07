import theme from 'styles/theme';
import { render, screen } from 'utils/test-utils';

import ProfileMenu from '.';

describe('<ProfileMenu />', () => {
  it('should render the links', () => {
    const { container } = render(<ProfileMenu />);

    expect(screen.getByRole('link', { name: /my profile/i })).toHaveAttribute(
      'href',
      '/profile/me',
    );

    expect(screen.getByRole('link', { name: /my cards/i })).toHaveAttribute(
      'href',
      '/profile/cards',
    );

    expect(screen.getByRole('link', { name: /my orders/i })).toHaveAttribute(
      'href',
      '/profile/orders',
    );

    expect(screen.getByRole('link', { name: /sign out/i })).toHaveAttribute(
      'href',
      '/logout',
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render the menu with an active link defined', () => {
    render(<ProfileMenu activeLink="/profile/cards" />);

    expect(screen.getByRole('link', { name: /my cards/i })).toHaveStyle({
      background: theme.colors.primary,
      color: theme.colors.white,
    });
  });
});
