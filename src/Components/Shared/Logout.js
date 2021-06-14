import React, { useState } from 'react';
import { Modal, Fade, Backdrop, TextField, Button } from '@material-ui/core';
import { URL } from './api_url';
import sha256 from 'sha256';
import { useStyles } from './useStyles';

export const LogoutForm = ({ open, setOpen, setAuthenticated }) => {
    const classes = useStyles();

    const handleLogout = () => {
        setAuthenticated(localStorage.setItem("jwt_token", false));
        setAuthenticated(false);
        setOpen();
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

                        <h2 id="title">Logout</h2>

                        <div>
                            <Button fullWidth variant={'contained'} color={'primary'} onClick={handleLogout}>Logout</Button>

                            <Button fullWidth variant={'outlined'} color={'secondary'} onClick={setOpen}>Close</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </>
    )
}

export default LogoutForm;