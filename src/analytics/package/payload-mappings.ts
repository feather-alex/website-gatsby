export const removePackageItemPayloadMapping = ({
  packageIdentifier,
  removedItem,
}: {
  packageIdentifier: string;
  removedItem: string;
}) => ({
  package_identifier: packageIdentifier,
  removed_item_identifier: removedItem,
});

export const swapPackageItemPayloadMapping = ({
  packageIdentifier,
  swappedItem,
}: {
  packageIdentifier: string;
  swappedItem: string;
}) => ({
  package_identifier: packageIdentifier,
  swapped_item_identifier: swappedItem,
});

export const updateActionsPackagePayloadMapping = ({
  packageIdentifier,
}: {
  packageIdentifier: string;
}) => ({
  package_identifier: packageIdentifier,
});

export const packageDetailImageViewedMapping = ({
  imageUrl,
  imageIndex,
}: {
  imageUrl: string;
  imageIndex: number;
}) => ({
  image_url: imageUrl,
  image_index: imageIndex,
});
