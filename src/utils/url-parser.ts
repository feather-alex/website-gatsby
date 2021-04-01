import { TrackingParameters } from '../types/TrackingParameters';

export const getSearchParams = (queryString: string, output: 'array' | 'string', validator?: string[]) => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: Array<any> = [];

  if (queryString.substring(0, 1) === '?') {
    queryString = queryString.substring(1);
  }

  const items = queryString.split('&');

  for (let i = 0; i < items.length; i++) {
    const item = items[i].split('=');
    if (item.length === 2) {
      if (validator && validator.indexOf(item[0]) === -1) {
        continue;
      }

      if (output === 'array') {
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params.push({ [item[0]]: item[1].split(',') as any });
      } else {
        // TODO: Fix this the next time the file is edited.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        params.push({ [item[0]]: item[1] as any });
      }
    }
  }

  return params;
};

export const getSearchParamsString = (items: TrackingParameters) => {
  let str = '';
  const keys = Object.keys(items);
  for (let i = 0; i < keys.length; i++) {
    if (items[keys[i]]) {
      str += `${keys[i]}: ${items[keys[i]]}`;
      str += keys.length - 1 === i ? '' : ', ';
    }
  }
  return str;
};
