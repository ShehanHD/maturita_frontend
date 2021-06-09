import React, { useEffect, useState } from 'react'
import { DatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';

const TripFilter = () => {
    const [cities, setCities] = useState([]);
    const [filtered, setFiltered] = useState([])
    const [trip, setTrip] = useState({
        partenza: "",
        destinazione: "",
        data: new Date()
    });

    useEffect(() => {
        getCities();
    }, [])

    const inputHandle = (e) => {
        setTrip({ ...trip, [e.target.name]: e.target.value })
    }

    const getCities = async () => {
        let res = await fetch('./city.json')
        let value = await res.json();
        setCities(value)
    }

    return (
        <div className="trip-filter">
            <TextField
                label="Partenza"
                name={"partenza"}
                value={trip.partenza}
                onChange={inputHandle}
            />

            <TextField
                label="Destinazione"
                name={"destinazione"}
                value={trip.destinazione}
                onChange={inputHandle}
            />

            <DatePicker
                format={"yyyy-MM-dd"}
                color="primary"
                name={"data"}
                value={trip.data}
                onChange={inputHandle}
            />

            <Button variant={'contained'} color={'primary'}>Search</Button>
        </div>
    )
}

export default TripFilter;
