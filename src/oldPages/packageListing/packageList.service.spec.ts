import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';
import { PackageVariant } from '../../types/Package';
import { getPackageStatusListing } from './packageList.service';

const variants: PackageVariant[] = [
  {
    identifier: 'default',
    totalProducts: 4,
    rentalPrices: { 3: 309, 12: 90 },
    retailPrice: 1896,
    items: [
      {
        identifier: 'akepa-dresser',
        title: 'Akepa Dresser',
        variantIdentifier: 'akepa-color-white',
        brand: {
          identifier: 'feather',
          name: 'Feather'
        },
        retailPrice: 427,
        image: { desktop: '', mobile: '' },
        rentalPrices: { 3: 259, 12: 49 },
        options: [],
        type: 'package',
        description: '',
        dimensions: {
          image: { desktop: '', mobile: '' },
          width: '',
          height: '',
          length: '',
          weight: ''
        },
        displayOrder: 0,
        availability: [
          {
            deliveryArea: DeliveryAreaIdentifier.NY,
            isInStock: false,
            isEnabled: false,
            stockExpectedDate: null
          },
          {
            deliveryArea: DeliveryAreaIdentifier.SF,
            isInStock: true,
            isEnabled: false,
            stockExpectedDate: null
          },
          {
            deliveryArea: DeliveryAreaIdentifier.LA,
            isInStock: false,
            isEnabled: true,
            stockExpectedDate: null
          }
        ]
      },
      {
        identifier: 'akepa-nightstand',
        title: 'Akepa Nightstand',
        variantIdentifier: 'akepa-color-white',
        brand: {
          identifier: 'feather',
          name: 'Feather'
        },
        retailPrice: 265,
        image: { desktop: '', mobile: '' },
        rentalPrices: { 3: 119, 12: 19 },
        options: [],
        type: 'package',
        description: '',
        dimensions: { image: { desktop: '', mobile: '' }, width: '', height: '', length: '', weight: '' },
        displayOrder: 0,
        availability: [
          {
            deliveryArea: DeliveryAreaIdentifier.NY,
            isInStock: false,
            isEnabled: false,
            stockExpectedDate: null
          },
          {
            deliveryArea: DeliveryAreaIdentifier.SF,
            isInStock: false,
            isEnabled: true,
            stockExpectedDate: null
          },
          {
            deliveryArea: DeliveryAreaIdentifier.LA,
            isInStock: false,
            isEnabled: true,
            stockExpectedDate: null
          }
        ]
      }
    ],
    mainImage: { desktop: '', mobile: '' },
    options: [],
    availability: [
      {
        deliveryArea: DeliveryAreaIdentifier.NY,
        isInStock: false,
        isEnabled: false,
        stockExpectedDate: null
      },
      {
        deliveryArea: DeliveryAreaIdentifier.SF,
        isInStock: true,
        isEnabled: true,
        stockExpectedDate: null
      },
      {
        deliveryArea: DeliveryAreaIdentifier.LA,
        isInStock: false,
        isEnabled: true,
        stockExpectedDate: null
      }
    ]
  }
];

describe('Determining if a package is considered enabled', () => {
  it('should return true if at least one item of the package is enabled in any delivery area', () => {
    const isPackageEnabled = getPackageStatusListing(DeliveryAreaIdentifier.All, variants, 'isEnabled');
    expect(isPackageEnabled).toEqual(true);
  });

  it('should return true if at least one item of the package is enabled in the current delivery area', () => {
    const isPackageEnabled = getPackageStatusListing(DeliveryAreaIdentifier.SF, variants, 'isEnabled');
    expect(isPackageEnabled).toEqual(true);
  });

  it('should return false if all the items are not enabled in the current delivery area', () => {
    const isPackageEnabled = getPackageStatusListing(DeliveryAreaIdentifier.NY, variants, 'isEnabled');
    expect(isPackageEnabled).toEqual(false);
  });
});

describe('Determining if a package is considered in stock', () => {
  it('should return true if at least one item of the package is in stock in any delivery area', () => {
    const isPackageInStock = getPackageStatusListing(DeliveryAreaIdentifier.All, variants, 'isInStock');
    expect(isPackageInStock).toEqual(true);
  });

  it('should return true if at least one item of the package is in stock in the current delivery area', () => {
    const isPackageInStock = getPackageStatusListing(DeliveryAreaIdentifier.SF, variants, 'isInStock');
    expect(isPackageInStock).toEqual(true);
  });

  it('should return false if all the items are not in stock in the current delivery area', () => {
    const isPackageInStock = getPackageStatusListing(DeliveryAreaIdentifier.NY, variants, 'isInStock');
    expect(isPackageInStock).toEqual(false);
  });
});
