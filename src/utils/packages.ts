import { PackageForListing } from '../types/Package';
import { isArray } from 'util';

// Group packages room by identifier
export const groupByCategoryId = (packages: Array<PackageForListing>): { [id: string]: PackageForListing[] } => {
  if (packages && !isArray(packages)) {
    return {};
  }

  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return packages.reduce((accu: object, pkg: any) => {
    (accu[pkg.category.identifier] = accu[pkg.category.identifier] || []).push(pkg);
    return accu;
  }, {});
};
