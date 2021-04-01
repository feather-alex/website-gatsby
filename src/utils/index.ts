import { Image, Availability } from '../types/Product';
import { getIsMobileDevice } from '../app/store/dimensions/dimensions.selectors';
import store from '../store';

export const getImageSourceArray = (image: Image): string[] => {
  const sources: string[] = [];
  const params = `?auto=compress&q=65`;

  const globalState = store.getState();

  if (getIsMobileDevice(globalState) && image.mobile) {
    sources.push(`${image.mobile}${params}`);
  } else {
    if (image.desktop) {
      sources.push(`${image.desktop}${params}`);
    }
    if (image.mobile) {
      sources.push(`${image.mobile}${params}`);
    }
  }

  return sources;
};

export const getProductEntity = (id: string, entities: object) => {
  const identifier = Object.keys(entities).find((key) => {
    const entity = entities[key];

    if (Array.isArray(entity)) {
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return !!entity.find((e: any) => e.identifier === id);
    } else if (key === 'categories' && Array.isArray(entity.products)) {
      // TODO: Fix this the next time the file is edited.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return !!entity.products.find((product: any) => product.identifier === id);
    }

    return false;
  });

  if (identifier) {
    return identifier;
  }

  return id;
};

export const getParams = (id: string, entities: object): object | string => {
  switch (getProductEntity(id, entities)) {
    case 'types':
      return { type: id };
    case 'cities':
      return { location: id };
    case 'brands':
      return { brand: id };
    case 'styles':
      return { style: id };
    case 'categories':
      return { category: id };
    default:
      return id;
  }
};

export const isEnabled = (location: string | null, availability: Array<Availability> | null): boolean => {
  if (!availability) {
    return false;
  }

  if (location === 'all' || location === 'none' || !location) {
    const enabledStatus = availability.map((detail) => detail.isEnabled);
    return enabledStatus.some((status) => status === true);
  } else {
    const availabilityDetails = availability.find((detail) => detail.deliveryArea === location);
    return availabilityDetails?.isEnabled || false;
  }
};

export const isInStock = (location: string | null, availability: Array<Availability> | null): boolean => {
  if (!availability) {
    return false;
  }

  if (location === 'all' || location === 'none' || !location) {
    const stockStatus = availability.map((detail) => detail.isInStock);
    return !!stockStatus.find((status) => status === true);
  } else {
    const stockInfo = availability.find((detail) => detail.deliveryArea === location);
    return stockInfo?.isInStock || false;
  }
};

export const isInStockAndEnabled = (location: string | null, availability: Array<Availability> | null): boolean => {
  return isEnabled(location, availability) && isInStock(location, availability);
};

export const backInStockDate = (location: string | null, availability: Availability[] | null): string | null => {
  if (!availability || location === 'all' || location === 'none' || !location) {
    return null;
  }

  const stockInfo = availability.find((detail) => detail.deliveryArea === location);

  return stockInfo?.stockExpectedDate || null;
};
