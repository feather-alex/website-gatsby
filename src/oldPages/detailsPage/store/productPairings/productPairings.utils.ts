import { ProductForListing } from '../../../../types/Product';

// utility function used for ensuring we don't return any of the products that we creating this paired list from
// and guarantee that all the items are unique
export const filterPairedProducts = (productPairings: ProductForListing[], pairedProductIdentifiers: string[]) => {
  // This is to make sure we get unique items between the products from both endpoints (see productPairings.saga)
  const uniqueItems = [];
  const map = new Map();
  for (const item of productPairings) {
    if (!map.has(item.identifier)) {
      map.set(item.identifier, true);
      uniqueItems.push(item);
    }
  }

  return uniqueItems.filter((item) => !pairedProductIdentifiers.includes(item.identifier));
};
