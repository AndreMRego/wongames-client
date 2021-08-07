import { render, screen } from 'utils/test-utils';

import Base from '.';

jest.mock('components/Menu', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Menu"></div>;
    },
  };
});

jest.mock('components/Footer', () => {
  return {
    __esModule: true,
    default: function Mock() {
      return <div data-testid="Mock Footer"></div>;
    },
  };
});

describe('<Base />', () => {
  it('should render menu, footer and children', () => {
    render(
      <Base>
        <h1>Heading</h1>
      </Base>,
    );
    expect(screen.getByTestId(/mock Menu/i)).toBeInTheDocument();
    expect(screen.getByTestId(/mock Footer/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /heading/i }),
    ).toBeInTheDocument();
  });
});
