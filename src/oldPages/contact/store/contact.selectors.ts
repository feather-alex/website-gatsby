import { State as GlobalState } from '../../../types/ReduxState';

export const getIsProcessingRequest = ({ contact }: GlobalState) => contact.isProccessingRequest;

export const getDisplayErrorMessage = ({ contact }: GlobalState) => contact.displayErrorMessage;

export const getDisplaySuccessMessage = ({ contact }: GlobalState) => contact.displaySuccessMessage;
