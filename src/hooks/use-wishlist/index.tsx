import { GameCardProps } from 'components/GameCard';
import { createContext, useContext } from 'react';

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
        items: [],
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        loading: false,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

const useWishlist = () => useContext(WishlistContext);

export { useWishlist, WishlistProvider };