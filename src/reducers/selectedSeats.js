const initialValue = {
    total: 0
}
const seatPositions = {
    val: []
}
const initState = {
    isChecked: false
}

export function selectedSeats(state = initialValue, action) {
    return Object.assign({}, state, { total: action.payload });
}

export function seatsPositions(state = seatPositions, action) {
    return Object.assign({}, state, { val: action.payload });
}

export function seatsAdjacentChecker(state = initState, action) {
    return { ...state, isChecked: !state.isChecked };
}