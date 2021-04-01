import React from 'react';
import { SHADES } from '../variables';

const HamburgerMenuIcon = () => (
  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13h20M3 5h20M3 21h20" stroke={SHADES.BLACK} strokeWidth="2" strokeMiterlimit="10" />
  </svg>
);

export default HamburgerMenuIcon;
