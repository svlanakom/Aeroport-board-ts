import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { loadFlights, changeDate } from '../store/actionCreators';

function SearchFlights() {
    const [value, setValue] = useState<string>('');
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch: Dispatch<any> = useDispatch();

    const date: Date = useSelector(
        (state: FlightState) => state.date
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeDate(new Date(event.target.value)));
    };

    const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(loadFlights(moment(date).format("DD-MM-YYYY")));

        let dataQuery = {
            search: value,
            date: moment(date).format("DD-MM-YYYY"),
        };

        let pathname = "";

        if (location.pathname === "/") {
            pathname = "/departures?";
        } else {
            dataQuery = {
                ...dataQuery,
                ...qs.parse(location.search, { ignoreQueryPrefix: true }),
                search: value,
                date: moment(date).format("DD-MM-YYYY"),
            };
            pathname = location.pathname + "?";
        }

        const queryString = qs.stringify(dataQuery);
        navigate(`${pathname}${queryString}`);
    };

    return (
        <div className="search-block">
            <h1 className="search-block__title">Search flight</h1>
            <form className="search-block__form" onSubmit={onSearch}>
                <i className="fas fa-search"></i>
                <input
                    className="search-block__input"
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="Flight number"
                />
                <input
                    className="search-block__input"
                    type="date"
                    onChange={onDateChange}
                />
                <button className="search-block__btn">Search</button>
            </form>
        </div>
    );
}

export default SearchFlights;