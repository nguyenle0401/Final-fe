import { combineReducers } from "redux";
import idiomReducer from "./idiom.reducer";
import authReducer from "./auth.reducer";
import alertReducer from "./alert.reducer";
import userReducer from "./user.reducer";
import gameReducer from "./game.reducer";

export default combineReducers({
  idiom: idiomReducer,
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  game: gameReducer,
});
