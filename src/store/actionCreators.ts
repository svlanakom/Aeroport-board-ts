import axios from 'axios';
import * as actionTypes from './actionTypes';

const baseUrl = 'https://api.iev.aero/api/flights';

export function loadFlights(date: String) {
    return (dispatch: DispatchType) => {
        axios.get<{
            body: {
                arrival: IFlight[],
                departure: IFlight[]
            },
            error: any
        }>(`${baseUrl}/${date}`)
            .then(response => {
                dispatch({
                    type: actionTypes.FLIGHT_LOADED,
                    payload: { flights: response.data.body }
                });
            });
    };
}

export function changeDate(date: Date) {
    return (dispatch: DispatchType) => {
        dispatch({
            type: actionTypes.DATE_CHANGED,
            payload: { date }
        });
    };
}
