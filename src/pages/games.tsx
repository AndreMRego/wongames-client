import GamesTemplate, { GamesTemplateProps } from 'templates/Games';
import filterItemsMock from 'components/ExploreSidebar/mock';
import { initializeApollo } from 'utils/apollo';
import { QUERY_GAMES } from 'graphql/queries/games';

export default function GamesPage(props: GamesTemplateProps) {
  return <GamesTemplate {...props} />;
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: QUERY_GAMES,
    variables: { limit: 9 },
  });

  return {
    props: {
      revalidate: 60,
      games: data.games.map((game) => ({
        title: game.name,
        developer: game.developers[0].name,
        img: `http://192.168.171.61:1337${game.cover.url}`,
        price: new Intl.NumberFormat('en', {
          style: 'currency',
          currency: 'USD',
        }).format(game.price),
      })),
      filterItems: filterItemsMock,
    },
  };
}

/**
 * {
    title: 'Population Zero',
    developer: 'Rockstar Games',
    img: 'https://source.unsplash.com/user/willianjusten/300x140',
    price: 'R$ 235,00',
    promotionalPrice: 'R$ 215,00',
  },
 *  */
