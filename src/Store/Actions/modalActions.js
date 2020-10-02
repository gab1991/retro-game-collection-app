const showErrModal = (modalProps) => {
  return {
    type: 'SHOW_ERR',
    payload: { ...modalProps },
  };
};
const hideErrModal = () => {
  return {
    type: 'SHOW_ERR',
    payload: false,
  };
};

const showAuthModal = (bool) => {
  return {
    type: 'SHOW_AUTH',
    payload: bool,
  };
};

const showInfoModal = (modalProps) => {
  return {
    type: 'SHOW_INFO',
    payload: { ...modalProps },
  };
};
const hideInfoModal = () => {
  return {
    type: 'SHOW_INFO',
    payload: false,
  };
};

export {
  showErrModal,
  hideErrModal,
  showAuthModal,
  showInfoModal,
  hideInfoModal,
};
