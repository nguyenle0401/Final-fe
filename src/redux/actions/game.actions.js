import api from "../api";
const fetchGame = () => async (dispatch) => {
  try {
    const data = await api.get("/games/new");
    dispatch({ type: "FETCH_GAME_DONE", payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const gameActions = {
  fetchGame,
};
