import { useRouter } from 'next/router';
import { initializeApollo } from 'utils/apollo';
import Game, { GameTemplateProps } from 'templates/Game';

import { QueryGames, QueryGamesVariables } from 'graphql/generated/QueryGames';
import { QUERY_GAMES, QUERY_GAMES_BY_SLUG } from 'graphql/queries/games';
import {
  QueryGameBySlug,
  QueryGameBySlugVariables,
} from 'graphql/generated/QueryGameBySlug';
import { GetStaticProps } from 'next';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import {
  QueryUpcoming,
  QueryUpcomingVariables,
} from 'graphql/generated/QueryUpcoming';
import { QUERY_UPCOMING } from 'graphql/queries/upcoming';
import { getImageUrl } from 'utils/getImageUrl';

const apolloClient = initializeApollo();

const GamePage = (props: GameTemplateProps) => {
  const router = useRouter();

  // se a rota não tiver sido gerada ainda
  if (router.isFallback) return null;

  return <Game {...props} />;
};

export async function getStaticPaths() {
  const { data } = await apolloClient.query<QueryGames, QueryGamesVariables>({
    query: QUERY_GAMES,
    variables: { limit: 9 },
  });

  const paths = data.games.map(({ slug }) => ({
    params: { slug },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Get game data
  const { data } = await apolloClient.query<
    QueryGameBySlug,
    QueryGameBySlugVariables
  >({
    query: QUERY_GAMES_BY_SLUG,
    variables: {
      slug: `${params?.slug}`,
    },
    fetchPolicy: 'no-cache',
  });

  if (!data.games.length) {
    return {
      notFound: true,
    };
  }

  const game = data.games[0];

  // get recommended games
  const { data: recommendedSection } = await apolloClient.query<
    QueryRecommended
  >({
    query: QUERY_RECOMMENDED,
  });

  // get upcoming games and highlight
  const TODAY = new Date().toISOString().slice(0, 10);
  const { data: upcomingSection } = await apolloClient.query<
    QueryUpcoming,
    QueryUpcomingVariables
  >({
    query: QUERY_UPCOMING,
    variables: {
      date: TODAY,
    },
  });

  return {
    revalidate: 60,
    props: {
      slug: params?.slug,
      cover: `${getImageUrl(game.cover?.src)}`,
      gameInfo: {
        id: game.id,
        title: game.name,
        price: game.price,
        description: game.short_description,
      },
      gallery: game.gallery.map((image) => ({
        src: `${getImageUrl(image.src)}`,
        label: image.label,
      })),
      description: game.description,
      details: {
        developer: game.developers[0].name,
        releaseDate: game.release_date,
        platforms: game.platforms.map((platform) => platform.name),
        publisher: game.publisher?.name,
        rating: game.rating,
        genres: game.categories.map((category) => category.name),
      },
      ...(!!upcomingSection.showcase?.upcommingGames?.title && {
        upcomingTitle: upcomingSection.showcase?.upcommingGames?.title,
      }),
      upcomingGames: gamesMapper(upcomingSection.upcomingGames),
      upcomingHighlight: highlightMapper(
        upcomingSection.showcase?.upcommingGames?.highlight,
      ),
      recommendedTitle: recommendedSection.recommended?.section?.title,
      recommendedGames: gamesMapper(
        recommendedSection.recommended?.section?.games,
      ),
    },
  };
};

export default GamePage;
