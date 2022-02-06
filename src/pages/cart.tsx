import { GetServerSidePropsContext } from 'next';
import Cart, { CartProps } from 'templates/Cart';

import itemsMock from 'components/CartList/mock';
import cardsMock from 'components/PaymentOptions/mock';
import { initializeApollo } from 'utils/apollo';
import { QUERY_RECOMMENDED } from 'graphql/queries/recommended';
import { gamesMapper, highlightMapper } from 'utils/mappers';
import { QueryRecommended } from 'graphql/generated/QueryRecommended';
import protectedRoutes from 'utils/protected-routes';

export default function CartPage(props: CartProps) {
  return <Cart {...props} />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await protectedRoutes(context);
  const apolloClient = initializeApollo(null, session);

  const { data } = await apolloClient.query<QueryRecommended>({
    query: QUERY_RECOMMENDED,
  });

  return {
    props: {
      session,
      recommendedTitle: data.recommended?.section?.title,
      recommendedGames: gamesMapper(data.recommended?.section?.games),
      recommendedHighlight: highlightMapper(
        data.recommended?.section?.highlight,
      ),
      items: itemsMock,
      total: '$ 430,00',
      cards: cardsMock,
    },
  };
}
