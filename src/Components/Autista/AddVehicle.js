import { InputLabel, MenuItem, Select, TextField, Typography, FormControl, FormHelperText, FormLabel, makeStyles, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { URL } from '../Shared/api_url';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddVehicle = ({ vehicles, setVehicles }) => {
    const classes = useStyles();
    const [input, setInput] = useState({
        targa: "",
        marca: "",
        modello: "",
        alimentazione: "",
        numero_posti: 1,
        aria_condizionata: "",
        foto: ""
    })


    const inputHandle = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const handleImg = (e) => {
        let file = e.target.files[0]
        if (!file) {
            setInput({ ...input, foto: "" })
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                setInput({ ...input, foto: dataUri })
            })
    }

    const handleSubmit = () => {
        let a = localStorage.getItem("jwt_token");

        fetch(`${URL}/user/add_vehicle`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${a}`
            },
            body: JSON.stringify(input),
        })
            .then(response => {
                if (response.status === 201) {
                    return response.json()
                };
                throw "Il veicolo non è stato inserito";
            })
            .then(data => {
                console.log(data)
                //dispatch(callNotification(data.message, "success"));
                setVehicles([...vehicles, input])
                setInput({
                    targa: "",
                    marca: "",
                    modello: "",
                    alimentazione: "",
                    numero_posti: 1,
                    aria_condizionata: "",
                    foto: ""
                });

            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <div className="driver-list">
                <div>
                    <Typography variant={'h3'}>Aggiungi auto</Typography>

                    <TextField
                        required
                        fullWidth
                        className="inputs"
                        label="Targa"
                        name={"targa"}
                        value={input.targa}
                        onChange={inputHandle}
                    />

                    <TextField
                        required
                        fullWidth
                        className="inputs"
                        label="Marca"
                        name={"marca"}
                        value={input.marca}
                        onChange={inputHandle}
                    />

                    <TextField
                        required
                        fullWidth
                        className="inputs"
                        label="Modello"
                        name={"modello"}
                        value={input.modello}
                        onChange={inputHandle}
                    />

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel required id="alimentazione-label">Alimentazione</InputLabel>
                        <Select
                            fullWidth
                            className="inputs"
                            labelId="alimentazione-label"
                            id="alimentazione-select"
                            value={input.alimentazione}
                            name={"alimentazione"}
                            onChange={inputHandle}
                        >
                            <MenuItem value={"benzina"}>Benzina</MenuItem>
                            <MenuItem value={"diesel"}>Diesel</MenuItem>
                            <MenuItem value={"eletrica"}>Eletrico</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className={classes.formControl}>
                        <InputLabel required id="ac-label">Aria condizionata</InputLabel>
                        <Select
                            fullWidth
                            className="inputs"
                            labelId="ac-label"
                            id="ac-select"
                            value={input.aria_condizionata}
                            name={"aria_condizionata"}
                            onChange={inputHandle}
                        >
                            <MenuItem value={"si"}>SI</MenuItem>
                            <MenuItem value={"no"}>NO</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        fullWidth
                        type="number"
                        className="inputs"
                        label="Numero posti"
                        name={"numero_posti"}
                        value={input.numero_posti}
                        onChange={inputHandle}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        component="label"
                    >
                        Upload from File
                        <input
                            type="file"
                            accept={['.png', '.jpeg', '.jpg']}
                            hidden
                            multiple={false}
                            onChange={handleImg}
                        />
                    </Button>

                    <Button
                        className="inputs"
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={handleSubmit}>Submit</Button>
                </div>
            </div>

            {vehicles.map(item => <VehicleList key={item.targa} vehicle={item} />)}
        </>
    )
}

export default AddVehicle

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

const VehicleList = ({ vehicle }) => {
    return (
        <div className="vehicle">
            <div className="trip-list">
                <div className="trip-list-head">
                    <h2>Modello: {vehicle.modello}</h2>
                    <h2>Marca: {vehicle.marca}</h2>
                </div>
                <div className="trip-list-body">

                    <div className="image">
                        <img src={vehicle.foto === ""
                            ? "http://simpleicon.com/wp-content/uploads/car1.png"
                            : vehicle.foto} alt="veicolo" width="200" />
                    </div>

                    <div className="details">
                        <h3>Targa: {vehicle.targa}</h3>
                        <h3>Alimentazione: {vehicle.alimentazione}</h3>
                        <h3>Aria Condizionata: {vehicle.aria_condizionata}</h3>
                        <h3>Numero di posti: {vehicle.numero_posti}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

