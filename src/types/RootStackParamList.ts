export type RootStackParamList = {
  Home: undefined;
  Transaction: undefined;
};

/**
 * Specifying default types for useNavigation, Link, ref etc
 * @see https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc
 */
declare global {
  /* eslint-disable @typescript-eslint/no-namespace */
  namespace ReactNavigation {
    /* eslint-disable @typescript-eslint/no-empty-interface */
    interface RootParamList extends RootStackParamList {}
  }
}
