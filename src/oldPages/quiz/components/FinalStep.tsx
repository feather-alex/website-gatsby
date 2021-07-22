import isEmail from "validator/lib/isEmail";
import React from "react";
import Header3 from "../../../ui/headers/Header3";
import Button from "../../../ui/buttons/Button";

export interface Props {
  handleQuizClose: () => void;
  handleFinalStep: Function;
}

interface State {
  name: string;
  email: string;
}

class FinalStep extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "",
      email: "",
    };
  }

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changedType = event.currentTarget.dataset.type;

    if (changedType && typeof changedType === "string") {
      this.setState({ [changedType]: event.target.value } as Pick<
        State,
        keyof State
      >);
    }
  };

  handleFinalStep = () => {
    const { name, email } = this.state;

    this.props.handleFinalStep(name, email);
  };

  handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { name, email } = this.state;

    if (event.key === "Enter" && name.length && isEmail(email)) {
      // enter key is presssed
      this.handleFinalStep();
    }
  };

  render() {
    const { name, email } = this.state;

    const buttonDisabled = name.length > 1 && isEmail(email);

    return (
      <div className="quiz-step final-step">
        <div className="quiz-step__question">
          <Header3>Your results are almost in! just one last step...</Header3>
        </div>

        <div className="quiz-step__options">
          <div className="list">
            <span className="futura reg-12 input-label">First name</span>
            <input
              data-cy="quiz-first-name"
              type="text"
              data-type="name"
              className="input-style"
              onKeyUp={this.handleKeyUp}
              placeholder="Your first name"
              onChange={this.handleChangeInput}
            />
            <span className="futura reg-12 input-label">Email</span>
            <input
              data-cy="quiz-email"
              type="email"
              data-type="email"
              spellCheck={false}
              className="input-style"
              placeholder="Your email"
              onKeyUp={this.handleKeyUp}
              onChange={this.handleChangeInput}
            />
          </div>
        </div>

        <div className="quiz-actions">
          <Button
            dataCy="quiz-submit-button"
            isDisabled={!buttonDisabled}
            onClick={this.handleFinalStep}
          >
            See results
          </Button>
          <span
            role="button"
            tabIndex={0}
            className="clickable"
            onClick={this.props.handleQuizClose}
          >
            Close
          </span>
        </div>
      </div>
    );
  }
}

export default FinalStep;
