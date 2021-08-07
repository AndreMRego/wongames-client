import { render, screen } from 'utils/test-utils';

import GameInfo from '.';

const props = {
  id: '1',
  title: 'My Game Title',
  description: 'Game Description',
  price: 210,
};

describe('<GameInfo />', () => {
  it('should render game informations', () => {
    const { container } = render(<GameInfo {...props} />);

    expect(
      screen.getByRole('heading', { name: /My Game Title/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/\$210\.00/)).toBeInTheDocument();
    expect(screen.getByText(/Game Description/i)).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render buttons', () => {
    render(<GameInfo {...props} />);

    expect(
      screen.getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /wishlist/i }),
    ).toBeInTheDocument();
  });
});
