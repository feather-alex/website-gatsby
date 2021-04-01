/** @jsx jsx */
import { jsx } from "@emotion/react";
import { render, act, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { History } from "history";
import createRootReducer from "../../store/reducer";
import BaseImage from "./BaseImage";
import { Args } from "../../utils/use-intersection-observer";

jest.mock("../../assets/images/minus-cursor-1x.png", () => {
  return "";
});
jest.mock("../../assets/images/minus-cursor-2x.png", () => {
  return "";
});
jest.mock("../../assets/images/plus-cursor-1x.png", () => {
  return "";
});
jest.mock("../../assets/images/plus-cursor-2x.png", () => {
  return "";
});

let callbacks: (() => void)[] = [];
const fireIntersectCallbacks = () => {
  callbacks.map((fn) => fn());
};
jest.mock("../../utils/use-intersection-observer", () => {
  return ({ callback }: Args<HTMLElement>) => {
    if (callback) {
      callbacks.push(callback);
    }
  };
});

describe("<BaseImage />", () => {
  // TODO: Fix this the next time the file is edited.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mockStore = createStore(createRootReducer({} as History<any>));

  beforeEach(() => {
    callbacks = [];
  });

  it("has the correct alt and image url", () => {
    const alt = "Test alt";
    const imageUrl = "https://test.test";

    const { getByAltText } = render(
      <Provider store={mockStore}>
        <BaseImage alt={alt} imgUrl={imageUrl} />
      </Provider>
    );
    const imgEl = getByAltText(alt) as HTMLImageElement;

    expect(imgEl).toBeTruthy();
    expect(imgEl.alt).toEqual(alt);
    expect(imgEl.src).toMatch(imageUrl);
  });

  it("loads the high quality image on intersect", async () => {
    const alt = "Test alt";
    const imageUrl = "https://test.test";

    const { getByTestId, queryByTestId } = render(
      <Provider store={mockStore}>
        <BaseImage alt={alt} imgUrl={imageUrl} />
      </Provider>
    );

    expect(getByTestId("base-image-loading")).toBeTruthy();
    expect(queryByTestId("base-image-loaded")).toBeFalsy();

    act(fireIntersectCallbacks);

    expect(getByTestId("base-image-loaded")).toBeTruthy();
  });

  it("removes the lqip image on load of the high quality image", async () => {
    const alt = "Test alt";
    const imageUrl = "https://test.test";

    const { getByTestId, queryByTestId } = render(
      <Provider store={mockStore}>
        <BaseImage alt={alt} imgUrl={imageUrl} />
      </Provider>
    );

    expect(getByTestId("base-image-loading")).toBeTruthy();
    expect(queryByTestId("base-image-loaded")).toBeFalsy();

    act(fireIntersectCallbacks);

    const imgEl = getByTestId("base-image-loaded") as HTMLImageElement;
    fireEvent.load(imgEl);

    expect(queryByTestId("base-image-loading")).toBeFalsy();
  });

  it("adds correct queries to the image url", async () => {
    const alt = "Test alt";
    const imageUrl = "https://test.test";

    const { getByTestId } = render(
      <Provider store={mockStore}>
        <BaseImage
          alt={alt}
          imgUrl={imageUrl}
          width={100}
          height={100}
          queryParams={{ "custom-query": 10 }}
        />
      </Provider>
    );

    act(fireIntersectCallbacks);

    const imgEl = getByTestId("base-image-loaded") as HTMLImageElement;

    expect(imgEl.src).toMatch("w=100");
    expect(imgEl.src).toMatch("h=100");
    expect(imgEl.src).toMatch("custom-query=10");
  });

  it("renders zoom on zoom click", async () => {
    const alt = "Test alt";
    const imageUrl = "https://test.test";
    const zoomUrl = "https://test.zoom";

    const { getByTestId, getByAltText } = render(
      <Provider store={mockStore}>
        <BaseImage zoomUrl={zoomUrl} alt={alt} imgUrl={imageUrl} />
        <div id="image-zoom-portal" />
      </Provider>
    );

    act(fireIntersectCallbacks);

    const imgEl = getByTestId("base-image-loaded") as HTMLImageElement;
    fireEvent.click(imgEl);

    // /^$/ will match an alt text of '', where as // will match any alt text
    // (including the underlying img we don't want)
    const zoomImg = getByAltText(/^$/) as HTMLImageElement;
    expect(zoomImg.src).toMatch(zoomUrl);
  });
});
