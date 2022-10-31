import React from 'react';
import Flight from './Flight';

interface FlightsListProps {
    flightsList: IFlight[],
    status: string
}

function FlightsList({ flightsList, status }: FlightsListProps) {
    const extractDataList = (flightsList: IFlight[], flightDirection: string) => {
        return flightsList.map((flight) => <Flight key={flight.ID} flight={flight} />);
    };

    return <>{extractDataList(flightsList, status)}</>;
}

export default FlightsList;