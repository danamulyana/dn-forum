const ActionType = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  CLEAR: 'CLEAR',
};

function success(message) {
  return {
    type: ActionType.SUCCESS,
    payload: {
      message,
    },
  };
}

function error(message) {
  return {
    type: ActionType.ERROR,
    payload: {
      message,
    },
  };
}

function warn(message) {
  return {
    type: ActionType.WARNING,
    payload: {
      message,
    },
  };
}

function clear() {
  return {
    type: ActionType.CLEAR,
  };
}
