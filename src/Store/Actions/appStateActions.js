const SET_IS_MOBILE = 'SET_IS_MOBILE';
const SHOW_ERR_MODAL = 'SHOW_ERR_MODAL';
const SHOW_AUTH_MODAL = 'SHOW_AUTH_MODAL';
const SHOW_INFO_MODAL = 'SHOW_INFO_MODAL';
const SHOW_CORNER_NOTIFIER = 'SHOW_CORNER_NOTIFIER';

const setIsMobile = (bool) => {
  return {
    type: SET_IS_MOBILE,
    payload: bool,
  };
};

const showErrModal = (modalProps) => {
  return {
    type: SHOW_ERR_MODAL,
    payload: { ...modalProps },
  };
};
const hideErrModal = () => {
  return {
    type: SHOW_ERR_MODAL,
    payload: false,
  };
};

const showAuthModal = (bool) => {
  return {
    type: SHOW_AUTH_MODAL,
    payload: bool,
  };
};

const showInfoModal = (modalProps) => {
  return {
    type: SHOW_INFO_MODAL,
    payload: { ...modalProps },
  };
};
const hideInfoModal = () => {
  return {
    type: SHOW_INFO_MODAL,
    payload: false,
  };
};

const showCornerNotifier = (modalProps) => {
  return {
    type: SHOW_CORNER_NOTIFIER,
    payload: { ...modalProps },
  };
};
const hideCornerNotifier = () => {
  return {
    type: SHOW_CORNER_NOTIFIER,
    payload: false,
  };
};

export {
  showCornerNotifier,
  hideCornerNotifier,
  showErrModal,
  hideErrModal,
  showAuthModal,
  showInfoModal,
  hideInfoModal,
  setIsMobile,
};

export { SET_IS_MOBILE, SHOW_ERR_MODAL, SHOW_AUTH_MODAL, SHOW_INFO_MODAL, SHOW_CORNER_NOTIFIER };
