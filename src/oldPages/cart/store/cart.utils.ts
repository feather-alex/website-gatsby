import { CartItem, ProductIdentifiers } from './cart.types';

export const isItemUnavailable = (product: CartItem, unavailableItems: ProductIdentifiers[]) => {
  const unavailableItem = unavailableItems.find(
    (item) => item.productIdentifier === product.identifier && item.variantIdentifier === product.variantIdentifier
  );
  return unavailableItem !== undefined;
};

export const filterOutDuplicateProducts = (items: CartItem[]) => {
  return items.filter((item, index) => {
    return (
      items.findIndex(
        (_item) => _item.identifier === item.identifier && _item.variantIdentifier === item.variantIdentifier
      ) === index
    );
  });
};

export const getCartItemImage = (images: CartItem['image']) => {
  return images.mobile || images.desktop || '';
};
