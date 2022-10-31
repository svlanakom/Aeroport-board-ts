import moment from 'moment';
import React from 'react';

interface FlightProps {
    flight: IFlight
}

function Flight({ flight }: FlightProps) {
    return (
        <tr>
            <td>
                <span className={flight.term === "D" ? "terminal blue" : "terminal"}>
                    {flight.term}
                </span>
            </td>
            <td>{moment(flight.timeDepSchedule ?? flight.timeToStand).format("HH:mm")}</td>
            <td>
                <span>{flight['airportToID.name_en'] ?? flight['airportFromID.name_en']}</span>
            </td>
            <td>
                <span>{flight.status}</span>
            </td>
            <td>
                <span className="logo-company">
                    <img src={flight.airline.en.logoSmallName} alt={flight.airline.en.name} />
                    <span>{flight.airline.en.name}</span>
                </span>
            </td>
            <td>
                <span>{`${flight['carrierID.IATA']}${flight.fltNo}`}</span>
            </td>
            <td>
                <i className="fas fa-chevron-right"></i>
            </td>
        </tr>
    );
}

export default Flight;