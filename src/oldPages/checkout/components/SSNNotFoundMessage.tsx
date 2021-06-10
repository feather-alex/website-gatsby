/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useDispatch } from 'react-redux';
import { toggleOverlay } from '../../../app/store/overlay/overlay.actions';
import { Overlays } from '../../../app/store/overlay/overlay.types';
import { BRAND } from '../../../ui/variables';
import Button, { ButtonStyle } from '../../../ui/buttons/Button';

const SSNNotFoundMessage = () => {
  const dispatch = useDispatch();

  const openFailedSSNOverlay = () => {
    dispatch(toggleOverlay(Overlays.FailedSSNOverlay, true));
  };

  return (
    <div
      css={css`
        color: ${BRAND.ERROR};
        margin-bottom: 37px;
      `}
    >
      Uh oh! We're still having trouble finding your records. Please reenter your Social Security Number and
      double-check your legal name for any typos.
      <br />
      <br />
      If you're stuck, there is another way to rent with Feather.{' '}
      <Button style={ButtonStyle.INLINE} onClick={openFailedSSNOverlay}>
        Learn more
      </Button>
    </div>
  );
};

export default SSNNotFoundMessage;
