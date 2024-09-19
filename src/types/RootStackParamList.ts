export type RootStackParamList = {
  Home: undefined;
  AddTransaction: undefined;
  AddBeneficiary: undefined;
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
