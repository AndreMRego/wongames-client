import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';

import FormSignIn from '.';

describe('<FormSignIn />', () => {
  it('should render the form', () => {
    const { container } = renderWithTheme(<FormSignIn />);

    //textfield email
    //textfield password
    //button
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign in now/i }),
    ).toBeInTheDocument();
    expect(container.parentElement).toMatchSnapshot();
  });

  it('should render the forgot password link', () => {
    renderWithTheme(<FormSignIn />);

    //link

    expect(
      screen.getByRole('link', { name: /Forgot your password?/i }),
    ).toBeInTheDocument();
  });

  it('should render the text and link to sign up', () => {
    renderWithTheme(<FormSignIn />);

    //text
    //link

    expect(screen.getByText(/Don’t have an account?/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up?/i })).toBeInTheDocument();
  });
});
