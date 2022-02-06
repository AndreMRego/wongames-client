import { createContext, useContext, useEffect, useState } from 'react';
import { GameCardProps } from 'components/GameCard';
import { QueryWishlist_wishlists_games } from 'graphql/generated/QueryWishlist';
import { useQueryWishlist } from 'graphql/queries/wishlist';
import { useSession } from 'next-auth/client';
import { gamesMapper } from 'utils/mappers';

export type WishlistContextData = {
  items: GameCardProps[];
  isInWishlist: (id: string) => boolean;
  addToWishlist: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  loading: boolean;
};

export const WishlistContextDefaultValues: WishlistContextData = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null,
  loading: false,
};

export const WishlistContext = createContext<WishlistContextData>(
  WishlistContextDefaultValues,
);

export type WishlistProviderProps = {
  children: React.ReactNode;
};

const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [session] = useSession();
  const [wishlistItems, setWishlistItems] = useState<
    QueryWishlist_wishlists_games[]
  >([]);

  const { data, loading } = useQueryWishlist({
    skip: !session?.user?.email,
    context: {
      session,
    },
    variables: {
      identifier: session?.user?.email as string,
    },
  });

  useEffect(() => {
    setWishlistItems(data?.wishlists[0]?.games || []);
  }, [data]);

  const isInWishlist = (id: string) => false;

  const addToWishlist = (id: string) => {
    return null;
  };

  const removeFromWishlist = (id: string) => {
    return null;
  };

  return (
    <WishlistContext.Provider
      value={{
        items: gamesMapper(wishlistItems),
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };
