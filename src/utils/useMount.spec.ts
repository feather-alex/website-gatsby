import { renderHook } from '@testing-library/react-hooks';
import useMount from './useMount';

describe('useMount', () => {
  it('should only run for the first render', () => {
    let count = 0;
    const { rerender } = renderHook(() =>
      useMount(() => {
        count++;
      })
    );

    rerender();
    rerender();
    rerender();

    expect(count).toBe(1);
  });
});
