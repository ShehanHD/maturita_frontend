import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import { DatePicker, DateTimePicker } from '@material-ui/pickers';
import { URL } from '../Shared/api_url';
import { TripItem } from '../Trip/ShowTrips';
import { Link } from 'react-router-dom';


const CreateTrip = ({ vehicles }) => {
    const [input, setInput] = useState({
        id_veicolo: "",
        partenza: "",
        destinazione: "",
        durata: 0,
        data_di_partenza: new Date(),
        contributo: 0,
        bagagli: "1",
        soste: "",
        animali: "1"
    })
    const [cities, setCities] = useState([]);
    const [trips, setTrips] = useState();

    useEffect(() => {
        getCities();
        getTrips();
    }, [])

    const getTrips = () => {
        let a = localStorage.getItem("jwt_token");

        fetch(`${URL}/trip/all_created`, {
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${a}`
            }
        })
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

    const vehicleHandle = (e, val) => {
        console.log(val)
        val && setInput({ ...input, id_veicolo: (val.targa) })
    }

    const getCities = async () => {
        let res = await fetch('./city.json')
        let value = await res.json();
        setCities(value)
    }

    const inputHandle = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const handleDeparture = (e, val) => {
        val && setInput({ ...input, partenza: (val.comune) })
    }

    const handleDestination = (e, val) => {
        val && setInput({ ...input, destinazione: (val.comune) })
    }

    const inputDateDep = (e) => setInput({ ...input, data_di_partenza: e })

    const handleSubmit = () => {
        let a = localStorage.getItem("jwt_token");

        fetch(`${URL}/trip/new`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${a}`
            },
            body: JSON.stringify({
                ...input,
                data_di_partenza: prepDate(input.data_di_partenza)
            }),
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                };
                throw "dati patente non sono inseriti bene";
            })
            .then(data => {
                getTrips();
                setInput({
                    id_veicolo: "",
                    partenza: "",
                    destinazione: "",
                    durata: 0,
                    data_di_partenza: new Date(),
                    contributo: 0,
                    bagagli: "1",
                    soste: "",
                    animali: "1"
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    const prepDate = (data) => {
        var date = 'Y-m-d h:M:s'
            .replace('Y', data.getFullYear())
            .replace('m', data.getMonth() + 1)
            .replace('d', data.getDate())
            .replace('h', data.getHours())
            .replace('M', data.getMinutes())
            .replace('s', data.getSeconds());

        return date;
    }

    return (
        <>
            <div className="driver-list">
                <div>
                    <Typography variant={'h3'}>Crea viaggio</Typography>

                    <Autocomplete
                        className="inputs"
                        fullWidth
                        autoComplete
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
                        className="inputs"
                        fullWidth
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

                    {vehicles.length &&
                        <Autocomplete
                            className="inputs"
                            fullWidth
                            autoComplete
                            includeInputInList
                            filterSelectedOptions
                            value={input.veicolo}
                            onChange={vehicleHandle}
                            options={vehicles || []}
                            getOptionLabel={(vehicles) => vehicles.modello ?? ""}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    label="Veicolo"
                                    variant="standard"
                                />

                            )}
                        />
                    }

                    <TextField
                        required
                        fullWidth
                        className="inputs"
                        type="number"
                        label="Durata"
                        name={"durata"}
                        value={input.durata}
                        onChange={inputHandle}
                    />

                    <TextField
                        required
                        fullWidth
                        className="inputs"
                        type="number"
                        label="Contributo"
                        name={"contributo"}
                        value={input.contributo}
                        onChange={inputHandle}
                    />

                    <DateTimePicker
                        fullWidth
                        className="inputs"
                        label="Data di partenza"
                        format={"yyyy-MM-dd"}
                        color="primary"
                        name={"data_di_partenza"}
                        value={input.data_di_partenza}
                        onChange={inputDateDep}
                    />

                    <TextField
                        required
                        fullWidth
                        className="inputs"
                        label="Soste"
                        name={"soste"}
                        value={input.soste}
                        onChange={inputHandle}
                    />

                    <div style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-around"
                    }}>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Animali</FormLabel>
                                <RadioGroup aria-label="gender" name="animali" value={input.animali} onChange={inputHandle}>
                                    <FormControlLabel value="1" control={<Radio />} label="SI" />
                                    <FormControlLabel value="0" control={<Radio />} label="NO" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Bagagli</FormLabel>
                                <RadioGroup aria-label="gender" name="bagagli" value={input.bagagli} onChange={inputHandle}>
                                    <FormControlLabel value="1" control={<Radio />} label="SI" />
                                    <FormControlLabel value="0" control={<Radio />} label="NO" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <Button
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={handleSubmit}>Submit</Button>
                </div>
            </div>

            {trips && trips.length ? trips.map(item => <TripList key={item.id} trip={item} getTrips={getTrips} />)
                : <> <h3 style={{ color: "white", textAlign: "center", marginBottom: "1vh" }}>Non ci sono i viaggi</h3></>}

        </>
    )
}

export default CreateTrip



const TripList = ({ trip, getTrips }) => {
    const closeTrip = (id) => {
        let a = localStorage.getItem("jwt_token");

        fetch(`${URL}/trip/close/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${a}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw "dati patente non sono inseriti bene";
            })
            .then(data => {
                getTrips();
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="vehicle">
            <div className="trip-list">
                <div className="trip-list-head">
                    <h2> {trip.partenza}  <i className="fas fa-arrow-right"></i>  {trip.destinazione}</h2>
                </div>
                <div className="trip-list-body">

                    <div className="image">
                        <img src={trip.foto === ""
                            ? "http://simpleicon.com/wp-content/uploads/car1.png"
                            : trip.foto} alt="veicolo" width="200" />
                    </div>

                    <div className="details">
                        <p>Targa: {trip.id_veicolo}</p>
                        <p>Partenza: {trip.data_di_partenza}</p>
                        <p>Stato: {trip.stato}</p>
                        <sub>Creato al: {trip.creato_al}</sub>
                    </div>
                </div>
                {trip.stato === "Not Completed" &&
                    <div className="trip-list-foot">
                        <Link style={{ marginRight: "10px" }} className="link-btn" to={'/autista/trip_details/' + trip.id}>Dettagli</Link>
                        <Button variant={"contained"} color={"secondary"} onClick={() => closeTrip(trip.id)}>Close trip</Button>
                    </div>
                }
            </div>
        </div>
    )
}
