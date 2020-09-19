import { combineReducers } from "redux";
import blogReducer from "./blog.reducer";
import authReducer from "./auth.reducer";
import alertReducer from "./alert.reducer";
import userReducer from "./user.reducer";
import gameReducer from "./game.reducer";

export default combineReducers({
  blog: blogReducer,
  auth: authReducer,
  alert: alertReducer,
  user: userReducer,
  game: gameReducer,
});
