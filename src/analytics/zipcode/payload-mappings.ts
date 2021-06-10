import { DeliveryAreaIdentifier } from '../../app/store/plan/plan.types';

export const enterZipcodePayloadMapping = ({
  zipcode,
  deliveryAreaIdentifier,
  origin
}: {
  zipcode: string;
  deliveryAreaIdentifier: DeliveryAreaIdentifier;
  origin: string;
}) => ({
  customer_delivery_zip_code: zipcode,
  customer_delivery_area_identifier: deliveryAreaIdentifier,
  ui_location: origin
});
