import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from 'utils/test-utils';

import Checkbox from '.';

describe('<Checkbox />', () => {
  it('should render with label heading', () => {
    const { container } = render(
      <Checkbox label="checkbox label" labelFor="check" />,
    );

    // input a partir do papel/role
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    // input a partir da label associada
    expect(screen.getByLabelText(/checkbox label/i)).toBeInTheDocument();

    // label a partir do texto dela
    expect(screen.getByText(/checkbox label/i)).toHaveAttribute('for', 'check');

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render a checkbox without label', () => {
    render(<Checkbox />);

    expect(screen.queryByLabelText('Checkbox')).not.toBeInTheDocument();
  });

  it('should render with black label', () => {
    render(
      <Checkbox label="checkbox label" labelFor="check" labelColor="black" />,
    );

    expect(screen.getByText(/checkbox label/i)).toHaveStyle({
      color: '#030517',
    });
  });

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn();

    render(
      <Checkbox label="checkbox label" labelFor="check" onCheck={onCheck} />,
    );

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });

    expect(onCheck).toHaveBeenCalledWith(true);
  });

  it('should dispatch onCheck when status changes', async () => {
    const onCheck = jest.fn();

    render(
      <Checkbox
        label="checkbox label"
        labelFor="check"
        onCheck={onCheck}
        isChecked
      />,
    );

    expect(onCheck).not.toHaveBeenCalled();

    userEvent.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(onCheck).toHaveBeenCalledTimes(1);
    });

    expect(onCheck).toHaveBeenCalledWith(false);
  });

  it('should be accessible with tab', async () => {
    const onCheck = jest.fn();

    render(
      <Checkbox
        label="checkbox"
        labelFor="checkbox"
        onCheck={onCheck}
        isChecked
      />,
    );

    expect(document.body).toHaveFocus();

    userEvent.tab();

    expect(screen.getByLabelText(/checkbox/i)).toHaveFocus();
  });
});
