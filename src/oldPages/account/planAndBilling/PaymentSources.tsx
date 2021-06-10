/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import {
  removeBillingCardRequest,
  RemoveBillingCardRequest,
  setPrimaryCardRequest,
  SetPrimaryCardRequest,
  addBillingCardRequest,
  AddBillingCardRequest
} from './store/billing.information.actions';
import Title2 from '../../../ui/titles/Title2';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';
import AllCaps from '../../../ui/headers/AllCaps';
import AddBillingCardForm from './AddBillingCardForm';
import ErrorIcon from '../../../ui/icons/ErrorIcon';
import { ActionCreator } from '../../../types/FluxStandardActions';
import * as selectors from './store/billing.information.selectors';
import { State as GlobalState, APIError } from '../../../types/ReduxState';
import { getPaymentProfileRequest } from './store/billing.information.actions';
import { BillingResource } from './store/billing.information.types';
import { BRAND } from '../../../ui/variables';
import LoadingFeatherSymbol from '../../../ui/miscellaneous/LoadingFeatherArch';

export interface Props {
  addBillingCardRequest: AddBillingCardRequest;
  error: APIError;
  billing: BillingResource;
  isFetching: boolean;
  sources: BillingResource[];
  defaultPaymentSource: BillingResource;
  setPrimaryCardRequest: SetPrimaryCardRequest;
  removeBillingCardRequest: RemoveBillingCardRequest;
  getPaymentProfileRequest: ActionCreator;
  showBillingActions: boolean;
  isPastDue: boolean;
  showNewCardForm: boolean;
  toggleNewCardForm: () => void;
}

export interface State {
  isDefault: boolean;
}

class PaymentSources extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isDefault: true
    };
  }

  componentDidMount() {
    this.props.getPaymentProfileRequest();
  }

  defaultToggle = () => {
    this.setState((prevState) => ({
      isDefault: !prevState.isDefault
    }));
  };

  renderPaymentSources = () => {
    const { defaultPaymentSource, showBillingActions, sources, isPastDue } = this.props;

    const paymentSources =
      sources && sources.length > 0
        ? sources.map((card: BillingResource) => {
            const isPrimary = defaultPaymentSource.id === card.id;
            const expiryMonth = card.expMonth.toString().length === 1 ? `0${card.expMonth}` : card.expMonth.toString();

            return (
              <div
                key={card.id}
                css={css`
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  margin: 5px 0;
                  ${isPastDue && isPrimary && `color: ${BRAND.ERROR}; margin-left: -5px;`}
                `}
              >
                {isPastDue && isPrimary ? <ErrorIcon widthAndHeight={16} /> : null}

                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <Title2 isBold={isPrimary}>{`Card ending in ${card.lastFour}`}</Title2>
                  &ensp; {expiryMonth}/{card.expYear} &ensp;{' '}
                </div>

                {isPrimary && <AllCaps>primary</AllCaps>}

                <div
                  css={css`
                    display: flex;
                    margin-left: 10px;
                    align-items: baseline;
                    transition: opacity 0.2s ease-in;
                    ${showBillingActions ? 'opacity: 1;' : 'opacity: 0;'}
                  `}
                >
                  {showBillingActions && isPrimary && sources.length > 1 && (
                    <Button
                      dataCy="remove-card-button"
                      style={ButtonStyle.TEXT}
                      onClick={() => this.props.removeBillingCardRequest(card.id)}
                    >
                      Remove
                    </Button>
                  )}

                  {showBillingActions && !isPrimary && (
                    <React.Fragment>
                      <Button style={ButtonStyle.TEXT} onClick={() => this.props.setPrimaryCardRequest(card.id)}>
                        Make Primary
                      </Button>
                      <div
                        css={css`
                          margin-left: 20px;
                        `}
                      >
                        <Button style={ButtonStyle.TEXT} onClick={() => this.props.removeBillingCardRequest(card.id)}>
                          Remove
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              </div>
            );
          })
        : null;

    return paymentSources;
  };

  render() {
    const { showBillingActions, showNewCardForm, isFetching, error } = this.props;

    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {isFetching ? <LoadingFeatherSymbol /> : this.renderPaymentSources()}

        <div
          css={css`
            transition: height 0.5s ease-out;
            overflow: hidden;
            ${showNewCardForm && showBillingActions ? `height: 500px;` : `height: 0;`}
          `}
        >
          <AddBillingCardForm
            toggleNewForm={this.props.toggleNewCardForm}
            makeDefault={this.state.isDefault}
            defaultToggle={this.defaultToggle}
            addBillingCard={this.props.addBillingCardRequest}
            isFetching={this.props.isFetching}
          />
        </div>

        {error && (
          <div
            css={css`
              color: ${BRAND.ERROR};
              margin: 10px 0;
            `}
          >
            {error.message}
          </div>
        )}

        {!isFetching && (
          <div
            css={css`
              display: flex;
              margin-top: 15px;
              transition: opacity 0.2s ease-in;
              ${showBillingActions && !showNewCardForm ? `opacity: 1;` : `opacity: 0;`}
            `}
          >
            <Button dataCy="add-card-button" onClick={this.props.toggleNewCardForm}>
              Add a card
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  error: selectors.getError(state),
  sources: selectors.getSources(state),
  isFetching: selectors.isFetching(state),
  billing: selectors.getDefaultSource(state),
  defaultPaymentSource: selectors.getDefaultSource(state)
});

const mapDispatchToProps = {
  addBillingCardRequest,
  setPrimaryCardRequest,
  getPaymentProfileRequest,
  removeBillingCardRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSources);
