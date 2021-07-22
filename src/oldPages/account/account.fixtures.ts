import { initialState } from "../../store/reducer";
import { initialState as accountOverviewInitialState } from "./accountOverview/store/account.overview.reducer";
import { State } from "../../types/ReduxState";

export const stateWithPurchased: State = {
  ...initialState,
  accounts: {
    ...initialState.accounts,
    accountOverview: {
      ...accountOverviewInitialState,
      overview: {
        ...accountOverviewInitialState.overview,
        monthlySubtotal: 150,
        items: [
          {
            customerPurchaseDate: null,
            monthlySubtotal: 100,
            productVariant: {
              identifier: "white-black",
              product: {
                title: "Varick coffee table",
                identifier: "varick-coffee-table",
                images: [
                  {
                    mobile: "var-cof-02_silo_1_1x1c.tif",
                    desktop: "var-cof-02_silo_1_2x3.tif",
                  },
                ],
              },
              optionValues: [
                { identifier: "white-black", name: "White/Black" },
              ],
            },
          },
          {
            customerPurchaseDate: new Date("09-12-2020"),
            monthlySubtotal: 50,
            productVariant: {
              identifier: "white-black",
              product: {
                title: "Purchased Couch",
                identifier: "purchased-couch",
                images: [
                  {
                    mobile: "var-cof-02_silo_1_1x1c.tif",
                    desktop: "var-cof-02_silo_1_2x3.tif",
                  },
                ],
              },
              optionValues: [
                { identifier: "white-black", name: "White/Black" },
              ],
            },
          },
        ],
      },
    },
  },
};

export const stateWithoutPurchased: State = {
  ...initialState,
  accounts: {
    ...initialState.accounts,
    accountOverview: {
      ...accountOverviewInitialState,
      overview: {
        ...accountOverviewInitialState.overview,
        monthlySubtotal: 150,
        items: [
          {
            customerPurchaseDate: null,
            monthlySubtotal: 100,
            productVariant: {
              identifier: "white-black",
              product: {
                title: "Varick coffee table",
                identifier: "varick-coffee-table",
                images: [
                  {
                    mobile: "var-cof-02_silo_1_1x1c.tif",
                    desktop: "var-cof-02_silo_1_2x3.tif",
                  },
                ],
              },
              optionValues: [
                { identifier: "white-black", name: "White/Black" },
              ],
            },
          },
        ],
      },
    },
  },
};
