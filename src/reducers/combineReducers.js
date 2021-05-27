import { combineReducers } from "redux";
import data from "./mainReducer";
import { selectedSeats, seatsPositions, seatsAdjacentChecker } from "../reducers/selectedSeats";

const allReducers = combineReducers({
   data,
   selectedSeats,
   seatsPositions,
   seatsAdjacentChecker
})
export default allReducers;