import * as actionTypes from './actionTypes';

const initialState: FlightState = {
    flights: {
        arrival: [],
        departure: []
    },
    date: new Date()
};

const reducer = (
    state: FlightState = initialState,
    action: FlightAction
): FlightState => {
    switch (action.type) {
        case actionTypes.FLIGHT_LOADED:
            return {
                ...state,
                flights: action.payload.flights
            };
        case actionTypes.DATE_CHANGED:
            return {
                ...state,
                date: action.payload.date
            };
    }
    return state;
}

export default reducer;