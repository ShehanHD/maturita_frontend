import { Button, TextField, Typography } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers';
import React, { useState } from 'react'
import { URL } from '../Shared/api_url';

const DriverData = () => {
    const [input, setInput] = useState({
        numero_patente: "",
        grado: "",
        rilasciato: new Date(),
        scadenza: new Date()
    })

    const inputHandle = (e) => setInput({ ...input, [e.target.name]: e.target.value })

    const inputDateExp = (e) => setInput({ ...input, scadenza: e })

    const inputDateIss = (e) => setInput({ ...input, rilasciato: e })

    const handleSubmit = () => {
        let a = localStorage.getItem("jwt_token");

        fetch(`${URL}/user/add_license`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                'Authorization': `Bearer ${a}`
            },
            body: JSON.stringify({
                numero_patente: input.numero_patente,
                grado: input.grado,
                rilasciato: prepDate(input.rilasciato),
                scadenza: prepDate(input.scadenza)
            }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw "dati patente non sono inseriti bene";
            })
            .then(data => {
                console.log(data)
                if (data.body) {
                    //dispatch(callNotification(data.message, "success"));
                    setInput({
                        numero_patente: "",
                        grado: "",
                        rilasciato: new Date(),
                        scadenza: new Date()
                    });
                }
                else {
                    console.error(data.message)
                    //dispatch(callNotification(data.message, "warning"));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const prepDate = (data) => {
        var date = 'Y-m-d'
            .replace('Y', data.getFullYear())
            .replace('m', data.getMonth() + 1)
            .replace('d', data.getDate());

        return date;
    }

    return (
        <div className="driver">
            <div className="driver-list">
                <div>
                    <Typography variant={'h3'}>Dati patente</Typography>
                    <TextField
                        fullWidth
                        className="inputs"
                        label="Numero Patente"
                        name={"numero_patente"}
                        value={input.numero_patente}
                        onChange={inputHandle}
                    />

                    <TextField
                        fullWidth
                        className="inputs"
                        label="Destinazione"
                        name={"grado"}
                        value={input.grado}
                        onChange={inputHandle}
                    />

                    <DatePicker
                        fullWidth
                        className="inputs"
                        label="Rilasciato al"
                        format={"yyyy-MM-dd"}
                        color="primary"
                        name={"rilasciato"}
                        value={input.rilasciato}
                        onChange={inputDateIss}
                    />

                    <DatePicker
                        fullWidth
                        className="inputs"
                        label="Scadenza"
                        format={"yyyy-MM-dd"}
                        color="primary"
                        name={"scadenza"}
                        value={input.scadenza}
                        onChange={inputDateExp}
                    />

                    <Button
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={handleSubmit}
                    >Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default DriverData
