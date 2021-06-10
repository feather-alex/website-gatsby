import CSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';

export interface Props {
  image: string;
  title: string;
  subText?: string;
}

export const SplashPage = (props: Props) => {
  return (
    <CSSTransitionGroup
      transitionName="fade-in-up"
      transitionAppear={true}
      transitionAppearTimeout={2500}
      transitionEnterTimeout={2500}
      transitionLeave={false}
    >
      <div className="splash" style={{ backgroundImage: `url(${props.image})` }}>
        <div className="value reg-45 title">{props.title}</div>
        {props.subText ? <div className="futura reg-18 sub-text">{props.subText}</div> : null}
      </div>
    </CSSTransitionGroup>
  );
};
