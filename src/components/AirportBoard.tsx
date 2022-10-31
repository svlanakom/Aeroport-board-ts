import moment from 'moment';
import React, { useEffect } from 'react';
import { /* useSelector, shallowEqual, */ useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { loadFlights } from '../store/actionCreators';
import FlightSchedule from './FlightSchedule';
import SearchFlights from './SearchFlights';

function AirportBoard() {
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const date = moment().format('DD-MM-YYYY');
        dispatch(loadFlights(date));
    }, [dispatch]);

    // const flights: {
    //     arrival: IFlight[],
    //     departure: IFlight[]
    // } = useSelector(
    //     (state: FlightState) => state.flights,
    //     shallowEqual
    // );

    // useEffect(() => {
    //     console.log(flights);
    // }, [flights]);

    return (
        <>
            <SearchFlights />
            <FlightSchedule />
        </>
    );
}

export default AirportBoard;