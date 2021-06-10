/** @jsx jsx */
import { jsx } from '@emotion/core';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { History } from 'history';
import DesktopImageCarousel from './DesktopImageCarousel';
import createRootReducer from '../../../../../store/reducer';
import { ImagesUrls } from '../../../detailsPage.service';

jest.mock('../../../../../ui/images/BaseImage', () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ imgUrl }: any) => <img alt={''} src={imgUrl} />;
});

jest.mock('nuka-carousel', () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ({ children }: any) => <div data-testid="carousel">{children}</div>;
});

describe('<DesktopImageCarousel />', () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockStore = createStore(createRootReducer({} as History<any>));

  it('shows images when there are carousel images', () => {
    const images: ImagesUrls = {
      url: 'image.jpg',
      zoomUrl: 'zoomImage.jpg'
    };
    const { getByAltText } = render(
      <Provider store={mockStore}>
        <DesktopImageCarousel carouselImages={[images]} windowWidth={1000} />
      </Provider>
    );
    const imgEl = getByAltText('') as HTMLImageElement;

    expect(imgEl).toBeTruthy();
    expect(imgEl.src).toMatch(images.url);
  });

  it("doesn't show images when there are not carousel images", () => {
    const { queryByAltText, queryByTestId } = render(
      <Provider store={mockStore}>
        <DesktopImageCarousel carouselImages={[]} windowWidth={1000} />
      </Provider>
    );
    const imgEl = queryByAltText('');
    const carousel = queryByTestId('carousel');

    expect(carousel).toBeFalsy();
    expect(imgEl).toBeFalsy();
  });
});
