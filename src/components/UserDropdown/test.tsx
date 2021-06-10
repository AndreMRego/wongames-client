import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import userEvent from '@testing-library/user-event';

import UserDropdown from '.';

describe('<UserDropdown />', () => {
  it('should render the username', () => {
    renderWithTheme(<UserDropdown username="Andre" />);

    expect(screen.getByText(/andre/i)).toBeInTheDocument();
  });
  it('should render the menu', () => {
    renderWithTheme(<UserDropdown username="Andre" />);

    userEvent.click(screen.getByText(/andre/i));

    expect(
      screen.getByRole('link', { name: /my profile/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /wishlist/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sign out/i })).toBeInTheDocument();
  });
});
