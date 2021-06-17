import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import { URL } from '../Shared/api_url';
import { Autocomplete } from '@material-ui/lab';

const TripFilter = ({ setTrips }) => {
    const [cities, setCities] = useState([]);
    const [trip, setTrip] = useState({
        partenza: "",
        destinazione: "",
        data: new Date()
    });

    useEffect(() => {
        getTrips();
        getCities();
    }, [])

    const handleReset = () => {
        getTrips();
    }

    const inputHandle = (e) => {
        setTrip({ ...trip, [e.target.name]: e.target.value })
    }

    const inputDate = (e) => {
        setTrip({
            ...trip, data: e
        })
    }

    const getCities = async () => {
        let res = await fetch('./city.json')
        let value = await res.json();
        setCities(value)
    }

    const getTrips = () => {
        fetch(`${URL}/trip/all_available`)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw response;
            })
            .then(data => {
                if (data.body) {
                    setTrips(data.body)
                }
                else {
                    console.error(data.message);
                    //dispatch(callNotification(data.message, "warning"));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleFilter = () => {
        var date = 'Y-m-d'
            .replace('Y', trip.data.getFullYear())
            .replace('m', trip.data.getMonth() + 1)
            .replace('d', trip.data.getDate());

        if (trip.partenza !== "" && trip.destinazione !== "" && trip.data) {
            fetch(`${URL}/trip/all_filtered/${trip.partenza}/${trip.destinazione}/${date}`)
                .then(response => {
                    if (response.status === 200) {
                        return response.json()
                    };
                    throw response;
                })
                .then(data => {
                    if (data.body) {
                        setTrips(data.body)
                    }
                    else {
                        console.error(data.message);
                        //dispatch(callNotification(data.message, "warning"));
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleDeparture = (e, val) => {
        val && setTrip({ ...trip, partenza: (val.comune) })
    }

    const handleDestination = (e, val) => {
        val && setTrip({ ...trip, destinazione: (val.comune) })
    }

    return (
        <div className="trip-filter">
            <Autocomplete
                style={{ width: "22%" }}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={cities.comune}
                onChange={handleDeparture}
                options={cities || []}
                getOptionLabel={(c) => c.comune ?? ""}
                renderInput={(params) => (
                    <TextField
                        required
                        {...params}
                        label="Partenza"
                        variant="standard"
                    />

                )}
            />

            <Autocomplete
                style={{ width: "22%" }}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={cities.comune}
                onChange={handleDestination}
                options={cities || []}
                getOptionLabel={(c) => c.comune ?? ""}
                renderInput={(params) => (
                    <TextField
                        required
                        {...params}
                        label="Destinazione"
                        variant="standard"
                    />

                )}
            />

            <DatePicker
                format={"yyyy-MM-dd"}
                color="primary"
                name={"data"}
                value={trip.data}
                onChange={inputDate}
            />

            <Button variant={'contained'} color={'primary'} onClick={handleFilter}>Search</Button>
            <Button variant={'contained'} color={'inherit'} onClick={handleReset}>Reset</Button>
        </div>
    )
}

export default TripFilter;
