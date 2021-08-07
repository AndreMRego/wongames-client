import 'match-media-mock';
import { render, screen, fireEvent } from 'utils/test-utils';

import Gallery from '.';
import mockItems from './mock';

describe('<Gallery />', () => {
  it('should render thumbnails as buttons', () => {
    render(<Gallery items={mockItems.slice(0, 2)} />);

    expect(
      screen.getByRole('button', { name: /Thumb - Gallery Image 1/i }),
    ).toHaveAttribute('src', mockItems[0].src);

    expect(
      screen.getByRole('button', { name: /Thumb - Gallery Image 2/i }),
    ).toHaveAttribute('src', mockItems[1].src);
  });

  it('should handle the open modal', () => {
    render(<Gallery items={mockItems.slice(0, 2)} />);

    //seleciona o modal
    const modal = screen.getByLabelText('modal');

    //verificar se está escondido
    expect(modal.getAttribute('aria-hidden')).toBe('true');
    expect(modal).toHaveStyle({ opacity: 0, pointerEvents: 'none' });

    const thumb = screen.getByRole('button', {
      name: /Thumb - Gallery Image 1/i,
    });

    //clica na imagem para abrir o modal
    fireEvent.click(thumb);
    expect(modal.getAttribute('aria-hidden')).toBe('false');
    expect(modal).toHaveStyle({ opacity: 1 });
  });

  it('should open modal with selected image', async () => {
    render(<Gallery items={mockItems.slice(0, 2)} />);

    const thumb = screen.getByRole('button', {
      name: /Thumb - Gallery Image 2/i,
    });

    //clica na imagem para abrir o modal
    fireEvent.click(thumb);

    const img = await screen.findByRole('img', { name: /Gallery Image 2/i });
    expect(img.parentElement?.parentElement).toHaveClass('slick-active');
  });

  it('should handle the close modal when overlay or button clicked', () => {
    render(<Gallery items={mockItems.slice(0, 2)} />);

    //seleciona o modal
    const modal = screen.getByLabelText('modal');

    const thumb = screen.getByRole('button', {
      name: /Thumb - Gallery Image 1/i,
    });

    //clica na imagem para abrir o modal
    fireEvent.click(thumb);

    //clica na imagem para fechar o modal
    fireEvent.click(screen.getByLabelText(/close modal/i));

    expect(modal.getAttribute('aria-hidden')).toBe('true');
    expect(modal).toHaveStyle({ opacity: 0 });
  });

  it('should handle the close modal when ESC button is pressed', () => {
    const { container } = render(<Gallery items={mockItems.slice(0, 2)} />);

    //seleciona o modal
    const modal = screen.getByLabelText('modal');

    const thumb = screen.getByRole('button', {
      name: /Thumb - Gallery Image 1/i,
    });

    //clica na imagem para abrir o modal
    fireEvent.click(thumb);

    //clica na imagem para fechar o modal
    fireEvent.keyUp(container, { key: 'Escape' });

    expect(modal.getAttribute('aria-hidden')).toBe('true');
    expect(modal).toHaveStyle({ opacity: 0 });
  });
});
