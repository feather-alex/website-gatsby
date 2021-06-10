/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { connect } from 'react-redux';
import { loadPersonalInfo } from './store/personal.information.actions';
import { State as GlobalState } from '../../../types/ReduxState';
import { ActionCreator } from '../../../types/FluxStandardActions';
import { AddressInfo } from './store/personal.information.types';
import Title2 from '../../../ui/titles/Title2';
import LoadingFeatherSymbol from '../../../ui/miscellaneous/LoadingFeatherArch';
import * as personalInformationSelectors from './store/personal.information.selectors';
import { BREAKPOINTS } from '../../../ui/variables';

interface Props {
  email: string;
  phone: string;
  lastName: string;
  firstName: string;
  address: AddressInfo[];
  loadPersonalInfo: ActionCreator;
  isFetchingPersonalInfo: boolean;
}

class PersonalInformation extends React.Component<Props> {
  componentDidMount() {
    this.props.loadPersonalInfo();
  }

  render() {
    const { email, phone, address, lastName, firstName, isFetchingPersonalInfo } = this.props;

    const formatedPhone = phone ? `${phone.substring(0, 3)}.${phone.slice(3, 6)}.${phone.slice(6)}` : '';

    if (isFetchingPersonalInfo) {
      return <LoadingFeatherSymbol />;
    }

    return (
      <div
        css={css`
          @media ${BREAKPOINTS.DESKTOP} {
            margin-left: 20px;
          }
        `}
      >
        <div
          css={css`
            margin-bottom: 24px;
            > p {
              margin-bottom: 10px;
            }
          `}
        >
          <Title2>{`${firstName} ${lastName}`}</Title2>
          <Title2>{formatedPhone}</Title2>
          <Title2>{email}</Title2>
        </div>
        {address[0] && (
          <div
            css={css`
              > p {
                margin-bottom: 10px;
              }
            `}
          >
            <Title2>{`${address[0].address1}${address[0].address2 !== null ? ', ' + address[0].address2 : ''}`}</Title2>
            <Title2>{`${address[0].city}, ${address[0].region}, ${address[0].postal}`}</Title2>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  email: personalInformationSelectors.getEmail(state),
  phone: personalInformationSelectors.getPhone(state),
  address: personalInformationSelectors.getAddress(state),
  lastName: personalInformationSelectors.getLastName(state),
  firstName: personalInformationSelectors.getFirstName(state),
  isFetchingPersonalInfo: personalInformationSelectors.isFetching(state)
});

const mapDispatchToProps = {
  loadPersonalInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);
