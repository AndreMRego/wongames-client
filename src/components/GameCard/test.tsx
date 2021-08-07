import theme from 'styles/theme';
import { render, screen, fireEvent } from 'utils/test-utils';

import GameCard from '.';

const props = {
  id: '1',
  title: 'Population Zero',
  slug: '/population-zero',
  developer: 'Rockstar Games',
  img: '/img/red-dead-img.jpg',
  price: 235,
};

describe('<GameCard />', () => {
  it('should render correctly', () => {
    render(<GameCard {...props} />);

    expect(
      screen.getByRole('heading', { name: props.title }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: props.developer }),
    ).toBeInTheDocument();

    expect(screen.getByRole('img', { name: props.title })).toHaveAttribute(
      'src',
      props.img,
    );
    expect(screen.getByRole('link', { name: props.title })).toHaveAttribute(
      'href',
      `/game/${props.slug}`,
    );

    expect(screen.getByLabelText(/Add to Wishlist/i)).toBeInTheDocument();

    expect(screen.getByText('$235.00')).toBeInTheDocument();
  });

  it('should render price in label', () => {
    render(<GameCard {...props} />);

    const price = screen.getByText('$235.00');

    expect(price).not.toHaveStyle({
      'text-decoration': 'line-through',
    });

    expect(price).toHaveStyle({
      'background-color': theme.colors.secondary,
    });
  });

  it('should render a line-through in price when promotional', () => {
    render(<GameCard {...props} promotionalPrice={220} />);

    const oldPrice = screen.getByText('$235.00');

    const promotionalPrice = screen.getByText('$220.00');

    expect(oldPrice).toHaveStyle({
      'text-decoration': 'line-through',
    });

    expect(promotionalPrice).not.toHaveStyle({
      'text-decoration': 'line-through',
    });
  });

  it('should render a filled Favorite icon when favorite is true', () => {
    render(<GameCard {...props} favorite />);

    expect(screen.getByLabelText(/remove from Wishlist/i)).toBeInTheDocument();
  });

  it('should call onFav method when favorite is clicked', () => {
    const onFav = jest.fn();

    render(<GameCard {...props} favorite onFav={onFav} />);

    const button = screen.getAllByRole('button')[0];

    fireEvent.click(button);

    expect(onFav).toBeCalled();
  });

  it('should render Ribbon ', () => {
    render(
      <GameCard
        {...props}
        ribbon="My Favorite"
        ribbonColor="secondary"
        ribbonSize="small"
      />,
    );

    const ribbon = screen.getByText('My Favorite');

    expect(ribbon).toBeInTheDocument();
    expect(ribbon).toHaveStyle({ backgroundColor: '#3CD3C1' });
    expect(ribbon).toHaveStyle({
      height: '2.6rem',
      fontSize: '1.2rem',
    });
  });

  it('should render price with free label', () => {
    render(<GameCard {...props} price={0} />);

    const price = screen.queryByText(/free/i);

    expect(price).toBeInTheDocument();
  });
});
