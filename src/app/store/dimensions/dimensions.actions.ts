import { FluxStandardAction } from '../../../types/FluxStandardActions';

// Handle Window Resize
export const HANDLE_WINDOW_RESIZE = 'HANDLE_WINDOW_RESIZE';

export type HandleWindowResize = (height: number, width: number) => FluxStandardAction;

export const handleWindowResize: HandleWindowResize = (height: number, width: number) => ({
  type: HANDLE_WINDOW_RESIZE,
  payload: { height, width }
});
