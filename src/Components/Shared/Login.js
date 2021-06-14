import React, { useState } from 'react';
import { Modal, Fade, Backdrop, TextField, Button } from '@material-ui/core';
import { URL } from './api_url';
import sha256 from 'sha256';
import { useStyles } from './useStyles';

export const LoginForm = ({ open, setOpen, setAuthenticated }) => {
    const classes = useStyles();
    const [input, setInput] = useState({
        email: "",
        password: ""
    })

    const inputHandle = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        fetch(`${URL}/user/login/${input.email}/${(input.password)}`)
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
                    setAuthenticated(data.body.JWT_TOKEN)
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

export default LoginForm;