import { Story, Meta } from '@storybook/react/types-6-0';

import Menu from '.';

export default {
  title: 'Menu',
  component: Menu,
} as Meta;

export const Mobile: Story = (args) => <Menu {...args} />;

Mobile.parameters = {
  layout: 'fullscreen',
  viewport: {
    defaultViewport: 'mobile1',
  },
  backgrounds: {
    default: 'won-dark',
  },
};
