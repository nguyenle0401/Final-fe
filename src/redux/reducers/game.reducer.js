const ini = {
  time: 10,
  qty: 5,
  questions: [],
};

export default (state = ini, { type, payload }) => {
  switch (type) {
    case "FETCH_GAME_DONE":
      return {
        ...state,
        ...payload,
      };
    default:
      return { ...state };
  }
};
