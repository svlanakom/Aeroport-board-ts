import qs from 'qs';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import FlightsList from './FlightsList';
import NotFlight from './NotFlight';

function FlightSchedule() {
    const [status, setStatus] = useState("arrivals");
    const location = useLocation();
    const departureClass = status === "departures" ? "scoreboard__link_active" : "";
    const arrivalClass = status === "arrivals" ? "scoreboard__link_active" : "";
    const [flightsList, setFlightsList] = useState<IFlight[]>([]);

    const flights: {
        arrival: IFlight[],
        departure: IFlight[]
    } = useSelector(
        (state: FlightState) => state.flights,
        shallowEqual
    );

    useEffect(() => {
        const query = qs.parse(location.search, { ignoreQueryPrefix: true });
        if (location.pathname.includes("arrivals")) {
            setFlightsList(filterFlightsList(flights.arrival, query.search));
            setStatus("arrivals");
        } else {
            setFlightsList(filterFlightsList(flights.departure, query.search));
            setStatus("departures");
        }
    }, [location, flights.arrival, flights.departure]);

    const filterFlightsList = (flightsList: IFlight[], queryString: string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined) => {
        if (!queryString) return flightsList;
        return flightsList.filter((flight) => {
            const fltNo = `${flight["carrierID.IATA"]}${flight.fltNo}`;
            return fltNo.toLowerCase().includes(queryString.toString().toLowerCase());
        });
    };

    useEffect(() => {
        if (location.pathname.includes("arrivals")) {
            setStatus("arrivals");
        } else {
            setStatus("departures");
        }
    }, [location]);

    return (
        <div className="scoreboard">
            <div className="scoreboard__nav">
                <Link
                    to={`/departures${location.search}`}
                    className={`scoreboard__link scoreboard__link_departures ${departureClass}`}
                >
                    <i className="fas fa-plane-departure"></i>
                    Departures
                </Link>
                <Link
                    to={`/arrivals${location.search}`}
                    className={`scoreboard__link scoreboard__link_arrivals ${arrivalClass}`}
                >
                    <i className="fas fa-plane-arrival"></i>
                    Arrivals
                </Link>
            </div>
            <div className="scoreboard__table-wrapper">
                {flightsList.length !== 0 ?
                    <table className="scoreboard__table flights-list">
                        <thead className="flights-list__header">
                            <tr>
                                <th>Terminal</th>
                                <th>Local time</th>
                                <th>Destination</th>
                                <th>Status</th>
                                <th>Airline</th>
                                <th>Flight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <FlightsList flightsList={flightsList} status={status} />
                        </tbody>
                    </table>
                    : <NotFlight />
                }
            </div>
        </div>
    );
}

export default FlightSchedule;