import { PkgItem } from '../../../../../types/Package';

/**
 * *------------------------------------------------------------*
 * | Utilities functions for the quiz results / custom packages |
 * *------------------------------------------------------------*
 */

/**
 * Return array of all items (and their properties) that corresponds to initial quiz results.
 */
export const getQuizSelectedItems = (allItems: PkgItem[][]) => {
  const selectedItems = [];

  for (let i = 0; i < allItems.length; i++) {
    const currentItems = allItems[i];
    const selectedItem = currentItems.find((itm) => itm.selected === true);

    if (selectedItem) {
      selectedItems.push(selectedItem);
    }
  }
  return selectedItems;
};

export const getNamePossesive = (name: string) => {
  const lastLetterOfName = name[name.length - 1];
  return lastLetterOfName && lastLetterOfName.toLowerCase() === 's' ? `${name}'` : `${name}'s`;
};

export const getPackageTitle = (name: string, pkgId: string) => {
  let pkgName = '';

  switch (pkgId) {
    case 'diningRoom':
      pkgName = 'Dining Room';
      break;

    case 'livingRoom':
      pkgName = 'Living Room';
      break;

    case 'homeOffice':
      pkgName = 'Home Office';
      break;

    case 'bedroom1':
      pkgName = 'Bedroom';
      break;

    case 'bedroom2':
      pkgName = 'Bedroom 2';
      break;

    case 'bedroom3':
      pkgName = 'Bedroom 3';
      break;

    default:
      pkgName = 'home package';
      break;
  }

  const quizNameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

  return `${getNamePossesive(quizNameCapitalized)} ${pkgName}`;
};

export const getRoomDescription = (roomName: string) => {
  switch (roomName) {
    case 'diningRoom':
      return `All you need now is a room full of friends and a few bottles of wine.
        Everything in this package was curated to work together based on style, size, color, and
        material. To customize even more, simply edit or remove items.`;

    case 'livingRoom':
      return `All you need now is a bowl of popcorn and your favorite Netflix shows.
        Everything in this package was curated to work together based on style, size, color, and
        material. To customize even more, simply edit or remove items.`;

    case 'bedroom1':
    case 'bedroom2':
    case 'bedroom3':
      return `All you need now is some plush pillows and a cozy comforter. Everything in
        this package was curated to work together based on style, size, color, and material. To
        customize even more, simply edit or remove items.`;

    case 'homeOffice':
      return `All you need now is a plant and a sign that says, "do not disturb." Everything
        in this package was curated to work together based on style, size, color, and material. To
        customize even more, simply edit or remove items.`;

    default:
      return '';
  }
};

export const getRoomPackage = (roomId: string, packageItems: PkgItem[][], quizName: string, name?: string) => {
  const items: PkgItem[][] = [];

  for (let i = 0; i < packageItems.length; i++) {
    const currentItems: PkgItem[] = packageItems[i];

    const selectedItems = currentItems.find((item) => item.selected === true);

    if (!selectedItems) {
      currentItems[0].selected = true;
    }

    items.push(currentItems);
  }

  const title: string = getPackageTitle(name || quizName || '', roomId);

  const description: string = getRoomDescription(roomId);

  return {
    title,
    items,
    description
  };
};
