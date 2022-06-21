import Highlight, { HighlightProps } from 'components/Highlight';
import Heading from 'components/Heading';
import GameCardSlider from 'components/GameCardSlider';
import { GameCardProps } from 'components/GameCard';

import * as S from './styles';

export type ShowcaseProps = {
  title?: string;
  highlight?: HighlightProps;
  games?: GameCardProps[];
  color?: 'black' | 'white';
};

const Showcase = ({
  title,
  highlight,
  games,
  color = 'white',
}: ShowcaseProps) => (
  <S.Wrapper data-cy={title || 'showcase'}>
    {!!title && (
      <Heading lineLeft lineColor="secondary">
        {title}
      </Heading>
    )}
    {!!highlight && Object.keys(highlight).length && (
      <Highlight {...highlight} />
    )}
    {!!games && <GameCardSlider items={games} color={color} />}
  </S.Wrapper>
);

export default Showcase;
