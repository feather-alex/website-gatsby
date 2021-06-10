import { ProductForListing, VariantDetails, IdentifierAndName, ProductListResponse } from '../../types/Product';
import { Location } from 'history';
import { getFilters, FilterType } from './filter.service';
import { Categories, ProductCategory } from '../../app/store/entities/entities.types';
import { ProductListSuccessPayload } from './store/productList.types';
import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';

export const getVariantLink = (product: ProductForListing, variant: VariantDetails): string => {
  const productLinkPrefix = `/products/${product.identifier}`;
  const productLinkSuffix = product.variants.length > 1 ? `?variant=${variant.identifier}` : '';
  return productLinkPrefix + productLinkSuffix;
};

export const getIsNoVariantsInAnyArea = (product: ProductForListing, location: string) =>
  location === 'all' &&
  !product.variants.some((variant) => variant.availability.some((availability) => availability.isEnabled));

export const getIsNoVariantsInSelectedArea = (product: ProductForListing, location: string) =>
  location !== 'all' &&
  !product.variants.some((variant) =>
    variant.availability.some((availability) => availability.isEnabled && availability.deliveryArea === location)
  );

export const getShouldShowProduct = (product: ProductForListing, deliveryArea: DeliveryAreaIdentifier) => {
  return !getIsNoVariantsInSelectedArea(product, deliveryArea) || !getIsNoVariantsInAnyArea(product, deliveryArea);
};

export const isThereAVariantPriceDifference = <T extends { retailPrice: number }>(variants: T[]) => {
  return variants.some((variant) => variant.retailPrice !== variants[0].retailPrice);
};

// NOTE:
// The following code involving SEO is a temporary
// solution. This data should really be stored in
// the database and retrieved from the API.

// Customize the header and page meta fields based
// on the current category and filters for SEO and
// OpenGraph purposes.
const BASE_URL = 'https://img.livefeather.com';
const IMG_PRODUCTS_URL = `${BASE_URL}/products`;
const IMG_PARAMS = '?fm=jpg&auto=compress&sat=29&q=15?sharp=15&w=800';

// TODO: Fix this the next time the file is edited.
// eslint-disable-next-line complexity
export const getHelmetData = (
  location: Location,
  categories: Categories | null,
  filterNameMap: { [id: string]: string | undefined }
) => {
  let title = 'All Furniture';
  let image = 'https://img.livefeather.com/pages-new/Homepage/two.jpg?auto=compress&sat=35&q=65&sharp=25&w=300&dpr=1.7';
  const description =
    'Creating a home you love should be easy. Rent from 200+ pieces of furniture, art, and rugs, get everything delivered + assembled in as little as 7 days.';

  const splitPath = location.pathname.split('/');
  const selectedCategory = splitPath[splitPath.length - 1];

  if (categories && selectedCategory !== '') {
    const category = categories.products.find((x: ProductCategory) => x.identifier === selectedCategory);
    const categoryName = category ? category.name : 'All';

    title = selectedCategory === 'lighting' ? `Lamps & Lighting` : `${categoryName} Furniture`;
    if (category) {
      switch (selectedCategory) {
        case 'lighting':
          image = `${BASE_URL}/pages-new/FLP/Hero%20Image-3.png?fm=jpg&auto=compress&sat=29&q=15?sharp=15&w=800`;
          break;

        case 'living-room':
          image = `${BASE_URL}/pages-new/FLP/living.png?fm=jpg&auto=compress&sat=18&q=15?sharp=23&w=500`;
          break;

        case 'bedroom':
          image = `${BASE_URL}/pages-new/FLP/bed.png?auto=compress&sat=22&q=93?sharp=23&fm=jpg&w=500`;
          break;

        case 'dining-room':
          image = `${BASE_URL}/pages-new/FLP/Hero%20Image-1.png?auto=compress&sat=35&q=15?sharp=22&fm=jpg&w=700`;
          break;

        case 'home-office':
          image = `${BASE_URL}/pages-new/FLP/office.png?auto=compress&sat=18&q=15?sharp=23&fm=jpg&w=500`;
          break;

        case 'kids-room':
          image = `${BASE_URL}/pages-new/FLP/Hero%20Image-2.png?auto=compress&sat=34&q=15?sharp=13&fm=jpg&w=800`;
          break;

        case 'outdoor':
          image = `${BASE_URL}/pages-new/FLP/Hero%20Image.png?auto=compress&sat=18&q=15?sharp=0&fm=jpg&w=600`;
          break;

        default:
          // do nothing
          break;
      }
    }
  } else {
    // Next, check for the presence of exactly one
    // filter, such as brand name or a product type.
    const filterMap = getFilters(location);
    const selectedSubclassFilters = filterMap[FilterType.SUBCLASS];
    const selectedBrandFilters = filterMap[FilterType.BRAND_FILTER];

    // Brand filter
    if (
      selectedBrandFilters.length === 1 &&
      selectedSubclassFilters.length === 0 &&
      selectedBrandFilters[0] !== 'feather'
    ) {
      const theBrand = filterNameMap[selectedBrandFilters[0]];

      title = `${theBrand} Products`;
    }

    // Subclass filter
    if (selectedBrandFilters.length === 0 && selectedSubclassFilters.length === 1) {
      const theType = filterNameMap[selectedSubclassFilters[0]] || '';
      let theTypePlural = theType;

      if (theType === 'Bench' || theType === 'Mattress') {
        theTypePlural = theType ? `${theType}es` : ``;
      } else {
        theTypePlural = theType ? `${theType}s` : ``;
      }

      title = theTypePlural;

      switch (selectedSubclassFilters[0]) {
        case 'bar-carts':
          image = `${IMG_PRODUCTS_URL}/oriole-bar-cart/images/x6212-other-02-desktop.jpg`;
          break;
        case 'bar-stools':
          image = `${IMG_PRODUCTS_URL}/alden-bar-counter-stool/images/x7012-other-01-desktop.jpg`;
          break;
        case 'beds':
          image = `${IMG_PRODUCTS_URL}/mod-upholstered-platform-bed/images/x7000-other-03-desktop.jpg`;
          break;
        case 'benches':
          image = `${IMG_PRODUCTS_URL}/jay-bench/images/x5608-other-01-desktop.jpg`;
          break;
        case 'bookcases':
          image = `${IMG_PRODUCTS_URL}/gallito-bookcase/images/x7206-detail-desktop.jpg`;
          break;
        case 'chairs':
          image = `${IMG_PRODUCTS_URL}/andean-chair/images/x6214-other-01-desktop.jpg`;
          break;
        case 'coffee-tables':
          image = `${IMG_PRODUCTS_URL}/grenadier-coffee-table/images/x6407-other-00-desktop.jpg`;
          break;
        case 'consoles':
          image = `${IMG_PRODUCTS_URL}/redwing-console/images/x6204-other-02-desktop.jpg`;
          break;
        case 'cribs':
          image = `${IMG_PRODUCTS_URL}/kookaburra-convertible-crib/images/x4094-other-01-desktop.jpg`;
          break;
        case 'desk-chairs':
          image = `${IMG_PRODUCTS_URL}/cooper-mid-century-chair/images/x7001-other-02-desktop.jpg`;
          break;
        case 'desks':
          image = `${IMG_PRODUCTS_URL}/mid-century-desk/images/x7003-other-02-desktop.jpg`;
          break;
        case 'dining-tables':
          image = `${IMG_PRODUCTS_URL}/mid-century-expandable-dining-table/images/x7016-other-03-desktop.jpg`;
          break;
        case 'dressers':
          image = `${IMG_PRODUCTS_URL}/fenton-5-drawer-dresser/images/x6000-other-01-desktop.jpg`;
          break;
        case 'electronics':
          image = `${IMG_PRODUCTS_URL}/brolga-floor-air-conditioner/images/x3072-other-04-desktop.jpg`;
          break;
        case 'filing-cabinet':
          image = `${IMG_PRODUCTS_URL}/linnet-filing-cabinet/images/x4096-other-02-desktop.jpg`;
          break;
        case 'floor-lamps':
          image = `${IMG_PRODUCTS_URL}/crane-floor-lamp/images/x5001-detail-desktop.jpg`;
          break;
        case 'kids-bedrooms':
          image = `${IMG_PRODUCTS_URL}/austen-bed-and-dresser-set/images/x6815G-main-desktop.jpg`;
          break;
        case 'kids-mattresses':
          image = `${IMG_PRODUCTS_URL}/lullaby-crib-mattress/images/x6813-other-01-desktop.jpg`;
          break;
        case 'kitchen-carts':
          image = `${IMG_PRODUCTS_URL}/currawong-kitchen-cart/images/x4093-other-02-desktop.jpg`;
          break;
        case 'lounge-chairs':
          image = `${IMG_PRODUCTS_URL}/willow-lounge-chair/images/x5000-other-02-desktop.jpg`;
          break;
        case 'loveseats':
          image = `${IMG_PRODUCTS_URL}/zapata-loveseat/images/x6607-other-01-desktop.jpg`;
          break;
        case 'mattresses':
          image = `${IMG_PRODUCTS_URL}/tuft-and-needle-mattress/images/x106-other-01-desktop.jpg`;
          break;
        case 'mirrors':
          image = `${IMG_PRODUCTS_URL}/metal-framed-floor-mirror/images/x7025-detail-desktop.jpg`;
          break;
        case 'nightstands':
          image = `${IMG_PRODUCTS_URL}/akepa-nightstand/images/x4049-other-01-desktop.jpg`;
          break;
        case 'ottomans':
          image = `${IMG_PRODUCTS_URL}/turnstone-ottoman/images/x6609-other-02-desktop.jpg`;
          break;
        case 'sectional-sofa':
          image = `${IMG_PRODUCTS_URL}/galah-sectional-sofa/images/x5605-other-02-desktop.jpg`;
          break;
        case 'side-tables':
          image = `${IMG_PRODUCTS_URL}/piha-side-table/images/x6406-other-02-desktop.jpg`;
          break;
        case 'sleeper-sofas':
          image = `${IMG_PRODUCTS_URL}/hopson-sleeper-sofa/images/x6002-other-04-desktop.jpg`;
          break;
        case 'sofas':
          image = `${IMG_PRODUCTS_URL}/eddy-sofa/images/x7006-other-00-desktop.jpg`;
          break;
        case 'storage-closets':
          image = `${IMG_PRODUCTS_URL}/marshall-hanging-storage-closet/images/x6802-other-02-desktop.jpg`;
          break;
        case 'table-lamps':
          image = `${IMG_PRODUCTS_URL}/dipper-table-lamp/images/x7402-other-01-desktop.jpg`;
          break;
        case 'whiteboards':
          image = `${IMG_PRODUCTS_URL}/merlin-whiteboard/images/x2099-detail-desktop.jpg`;
          break;
        default:
      }

      image += IMG_PARAMS;
    }
  }
  return {
    title,
    image,
    description
  };
};

type MappedIdentifierAndName = Record<string, IdentifierAndName>;

export const mainSubclasses: MappedIdentifierAndName = {
  chair: { identifier: 'chair', name: 'Chair' },
  bed: { identifier: 'bed', name: 'Bed' },
  dresser: { identifier: 'dresser', name: 'Dresser' },
  bench: { identifier: 'bench', name: 'Bench' },
  rug: { identifier: 'rug', name: 'Rug' },
  art: { identifier: 'art', name: 'Art' },
  stool: { identifier: 'stool', name: 'Stool' },
  screen: { identifier: 'screen', name: 'Screen' }
};

export const subclassMappings: MappedIdentifierAndName = {
  'upholstered-occasional-chair': mainSubclasses.chair,
  'non-upholstered-occasional-chair': mainSubclasses.chair,
  'bed-frame': mainSubclasses.bed,
  'upholstered-bed': mainSubclasses.bed,
  'non-upholstered-bed': mainSubclasses.bed,
  'tall-dresser': mainSubclasses.dresser,
  'wide-dresser': mainSubclasses.dresser,
  'upholstered-bench': mainSubclasses.bench,
  'non-upholstered-bench': mainSubclasses.bench,
  flatweave: mainSubclasses.rug,
  'hand-tufted-rug': mainSubclasses.rug,
  'shag-rug': mainSubclasses.rug,
  'framed-print': mainSubclasses.art,
  'dimensional-art': mainSubclasses.art,
  'bar-stool': mainSubclasses.stool,
  'counter-stool': mainSubclasses.stool,
  'upholstered-screen': mainSubclasses.screen,
  'non-upholstered-screen': mainSubclasses.screen
};

export const groupSubclasses = (subclasses: IdentifierAndName[]): IdentifierAndName[] =>
  Array.from(new Set(subclasses.map((subclass) => subclassMappings[subclass.identifier] || subclass)));

const subclassRankings: Record<string, number> = {
  sofa: 1,
  sectional: 2,
  'sleeper-sofa': 3,
  chair: 4,
  'coffee-table': 5,
  'side-table': 6,
  'media-console': 7,
  bed: 8,
  mattress: 9,
  dresser: 10,
  nightstand: 11,
  'dining-table': 12,
  'dining-chair': 13,
  stool: 14,
  'bar-cart': 15,
  desk: 16,
  'desk-chair': 17,
  console: 18,
  'table-lamp': 19,
  'floor-lamp': 20,
  cabinet: 21,
  bookcase: 22,
  art: 23,
  'floor-mirror': 24,
  'wall-mirror': 25,
  rug: 26,
  bench: 27,
  'ottoman-pouf': 28,
  screen: 29,
  'air-conditioner': 30
};
export const sortSubclasses = (subclasses: IdentifierAndName[]) =>
  subclasses.sort((a, b) => subclassRankings[a.identifier] - subclassRankings[b.identifier]);

export const formatProductListResponse = (
  response: ProductListResponse,
  isInfiniteLoading?: boolean
): ProductListSuccessPayload => {
  const meta = {
    pageNumber: 0,
    total: response.total,
    availableFilters: {
      ...response.availableFilters,
      subclasses: sortSubclasses(groupSubclasses(response.availableFilters.subclasses))
    }
  };
  const products = response.pageData;

  return { meta, products, isInfiniteLoading };
};
