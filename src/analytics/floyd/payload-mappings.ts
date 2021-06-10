export enum floydCTALocation {
  HERO_CTA = 'floyd page hero cta',
  FEATHER_X_FLOYD_CTA = 'floyd page feather x floyd section cta',
  BEST_OF_BOTH_CTA = 'floyd page best of both worlds section cta'
}
export const floydPayloadMapping = ({ location }: { location: floydCTALocation }) => ({
  location
});
