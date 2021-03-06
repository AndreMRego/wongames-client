import { Story, Meta } from '@storybook/react/types-6-0';
import { CartContextData } from 'hooks/use-cart';

import GameCard, { GameCardProps } from '.';
import item from './mock';

export default {
  title: 'GameCard',
  component: GameCard,
  args: item,
  argTypes: {
    onFav: {
      action: 'clicked',
    },
    ribbon: { type: 'string' },
  },
} as Meta;

export const Default: Story<GameCardProps> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
);

export const IsInCart: Story<GameCardProps & CartContextData> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
);

IsInCart.args = {
  isInCart: () => true,
};

export const WithRibbon: Story<GameCardProps> = (args) => (
  <div style={{ width: '30rem' }}>
    <GameCard {...args} />
  </div>
);

WithRibbon.args = {
  ribbon: '20% OFF',
  ribbonSize: 'small',
  ribbonColor: 'primary',
};
