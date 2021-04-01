import React from 'react';
import FeatherLogo from './FeatherWordMarkLogo';
import PinterestLogo from './PinterestLogo';
import InstagramLogo from './InstagramLogo';
import LinkedInLogo from './LinkedInLogo';
import FacebookLogo from './FacebookLogo';
import TwitterLogo from './TwitterLogo';
import FeatherArchLogo from './FeatherArchLogo';

export default {
  title: 'Logos'
};

export const Feather = () => (
  <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
    <FeatherLogo to="/" />
    <FeatherLogo to="/" isInverted={true} />
    <FeatherArchLogo />
  </div>
);

export const Pinterest = () => (
  <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
    <PinterestLogo />
    <PinterestLogo isInverted={true} />
  </div>
);

export const Instagram = () => (
  <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
    <InstagramLogo />
    <InstagramLogo isInverted={true} />
  </div>
);

export const LinkedIn = () => (
  <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
    <LinkedInLogo />
    <LinkedInLogo isInverted={true} />
  </div>
);

LinkedIn.story = {
  name: 'LinkedIn'
};

export const Facebook = () => (
  <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
    <FacebookLogo />
    <FacebookLogo isInverted={true} />
  </div>
);

export const Twitter = () => (
  <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
    <TwitterLogo />
    <TwitterLogo isInverted={true} />
  </div>
);
