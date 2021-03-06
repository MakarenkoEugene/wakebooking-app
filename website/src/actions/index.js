import * as constants from "../constants";

export const closseNavBar = () => ({ type: constants.NAV_BAR_CLOSSE });
export const showNavBar = () => ({ type: constants.NAV_BAR_SHOW });

export const setLoading = (dataIsLoading) => ({ type: constants.SET_LOADING, dataIsLoading });

export const onLoadedRecaptcha = () => ({ type: constants.RECAPTCHA_ON_LOADED });
export const onVerifyRecaptcha = () => ({ type: constants.RECAPTCHA_ON_VERIFY });

export const setDelaySendingRepeatedSMS = (needToWait) => ({
  type: constants.SET_DELAY_SENDING_REPEATED_SMS,
  needToWait,
});

export const setUser = (user) => ({ type: constants.SET_USER, user });
export const getUser = () => ({ type: constants.GET_USER });

export const signInReq = (data) => ({ type: constants.SIGN_IN_REQ, data });
export const signInRes = (response) => ({ type: constants.SIGN_IN_RES, response });

export const signUpReq = (data) => ({ type: constants.SIGN_UP_REQ, data });
export const signUpRes = (response) => ({ type: constants.SIGN_UP_RES, response });

export const clearResponse = () => ({ type: constants.CLEAR_RESPONSE });
