import request, { RequestMethod } from '../../../api/request';
import isEmail from 'validator/lib/isEmail';
import React from 'react';
import Modal from 'react-bootstrap/lib/Modal';
import Button from '../../../ui/buttons/Button';

export interface Props {
  zipcode: string;
  closeOverlay: () => void;
  isOpen: boolean;
}

export interface State {
  email: string;
  displayError: boolean;
  displayThanks: boolean;
}

class OutOfDeliveryZoneModal extends React.Component<Props, State> {
  public readonly state = {
    email: '',
    displayError: false,
    displayThanks: false
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && this.state.email.length) {
      this.submitEmail();
    }
  };

  handleEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  };

  submitEmail = () => {
    const { email } = this.state;
    if (email.length && isEmail(email)) {
      request
        .send(RequestMethod.POST, '/signup', undefined, { email }, true)
        .then(() => {
          this.setState(
            {
              displayThanks: true,
              displayError: false,
              email: ''
            },
            () => {
              setTimeout(() => {
                this.resetState();
                this.closeOverlay();
              }, 2000);
            }
          );
        })
        .catch(() => {
          this.setState({
            displayError: true,
            displayThanks: false
          });
        });
    } else {
      this.setState({ displayError: true });
    }
  };

  resetState = () => {
    this.setState({
      email: '',
      displayError: false,
      displayThanks: false
    });
  };

  closeOverlay = () => {
    this.props.closeOverlay();
  };

  render() {
    return (
      <Modal className="out-of-zone-modal" show={this.props.isOpen} onHide={this.closeOverlay}>
        <Modal.Body className="modal-body">
          <div role="button" tabIndex={0} className="close-modal clickable futura cap-10" onClick={this.closeOverlay}>
            CLOSE
          </div>
          <div className="custom-content">
            <h5 className="value reg-24">We currently do not deliver to your area</h5>
            <p className="currently">
              {this.props.zipcode} is not currently within our delivery zone. Get on our email list to be the first to
              know when we do offer delivery!
            </p>
            <div className="email-submit">
              {!this.state.displayError && !this.state.displayThanks ? (
                <React.Fragment>
                  <input
                    type="email"
                    spellCheck={false}
                    value={this.state.email}
                    placeholder="Email"
                    onKeyUp={this.handleKeyUp}
                    className="email-input futura reg-14"
                    onChange={this.handleEmailInput}
                  />
                  <Button onClick={this.submitEmail}>Send email</Button>
                </React.Fragment>
              ) : null}

              {this.state.displayError ? (
                <React.Fragment>
                  <input
                    type="email"
                    spellCheck={false}
                    value={this.state.email}
                    placeholder="Email"
                    onKeyUp={this.handleKeyUp}
                    className="email-input futura reg-14 email-input-error"
                    onChange={this.handleEmailInput}
                  />
                  <div className="email-error">*Invalid email</div>
                  <Button onClick={this.resetState}>Try again?</Button>
                </React.Fragment>
              ) : null}

              {this.state.displayThanks ? (
                <React.Fragment>
                  <Button isDisabled={true}>Thank you!</Button>
                </React.Fragment>
              ) : null}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default OutOfDeliveryZoneModal;
