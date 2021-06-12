import React, { useState } from 'react';
import { Modal, Fade, Backdrop, TextField, Button } from '@material-ui/core';
import { URL } from './api_url';
import sha256 from 'sha256';
import { useStyles } from './useStyles';


const NavBar = () => {
    const [loginForm, setLoginForm] = useState(false);
    const [registrationForm, setRegistrationForm] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    const handleRegistrationForm = () => setRegistrationForm(!registrationForm);

    const handleLoginForm = () => setLoginForm(!loginForm);

    return (
        <>
            <nav className="navbar">
                <ul className="nav-menu">
                    <li onClick={handleRegistrationForm}>Registrazione</li>
                    <li onClick={handleLoginForm}>Login</li>
                </ul>
            </nav>

            <RegistrationForm open={registrationForm} setOpen={handleRegistrationForm} />
            <LoginForm open={loginForm} setOpen={handleLoginForm} />
        </>
    );
}

export default NavBar;

export const RegistrationForm = ({ open, setOpen }) => {
    const classes = useStyles();
    const [input, setInput] = useState({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        password: "",
        re_password: "",
        carta_identita: ""
    })

    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        fetch(`${URL}/user/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(
                {
                    nome: input.nome,
                    cognome: input.cognome,
                    email: input.email,
                    telefono: input.telefono,
                    password: sha256(input.password),
                    re_password: sha256(input.password),
                    carta_identita: input.carta_identita
                }),
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw "Login Failed";
            })
            .then(data => {
                console.log(data)
                if (data.body) {
                    //dispatch(callNotification(data.message, "success"));
                    console.log(data.message)
                    localStorage.setItem("jwt__token", data.body.JWT_TOKEN);
                    setInput({
                        nome: "",
                        cognome: "",
                        email: "",
                        telefono: "",
                        password: "",
                        re_password: "",
                        carta_identita: ""
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

    return (
        <>
            <Modal
                className={classes.modal}
                aria-labelledby="title"
                aria-describedby="description"
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="form form-registration">

                        <h2 id="title">Registration</h2>

                        <TextField
                            fullWidth
                            label="Nome"
                            value={input.nome}
                            name="nome"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            label="Cognome"
                            value={input.cognome}
                            name="cognome"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            label="e-mail"
                            value={input.email}
                            name="email"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            label="Telefono"
                            value={input.telefono}
                            name="telefono"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            type="password"
                            label="Password"
                            value={input.password}
                            name="password"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            type="password"
                            label="Repeti password"
                            value={input.re_password}
                            name="re_password"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            label="Carta l'identita"
                            value={input.carta_identita}
                            name="carta_identita"
                            onChange={inputHandle}
                        />

                        <div>
                            <Button fullWidth variant={'contained'} color={'primary'} onClick={handleSubmit}>Register</Button>

                            <Button fullWidth variant={'outlined'} color={'secondary'} onClick={setOpen}>Close</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export const LoginForm = ({ open, setOpen }) => {
    const classes = useStyles();
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        fetch(`${URL}/user/login/${input.email}/${input.password}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw "Login Failed";
            })
            .then(data => {
                console.log(data)
                if (data.body) {
                    console.log(data.message)
                    //dispatch(callNotification(data.message, "success"));
                    localStorage.setItem("jwt_token", data.body.JWT_TOKEN);
                    setInput({
                        email: "",
                        password: ""
                    });
                    setOpen();
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

    return (
        <>
            <Modal
                className={classes.modal}
                aria-labelledby="title"
                aria-describedby="description"
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className="form form-login">

                        <h2 id="title">Login</h2>

                        <TextField
                            fullWidth
                            label="e-mail"
                            value={input.email}
                            name="email"
                            onChange={inputHandle}
                        />

                        <TextField
                            fullWidth
                            type="password"
                            label="password"
                            value={input.password}
                            name="password"
                            onChange={inputHandle}
                        />

                        <div>
                            <Button fullWidth variant={'contained'} color={'primary'} onClick={handleSubmit}>Login</Button>

                            <Button fullWidth variant={'outlined'} color={'secondary'} onClick={setOpen}>Close</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}
