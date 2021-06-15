import React from 'react';
import { Modal, Fade, Backdrop, Button } from '@material-ui/core';
import { useStyles } from './useStyles';
import { Redirect, useHistory } from 'react-router-dom';

export const LogoutForm = ({ open, setOpen, setAuthenticated }) => {
    const classes = useStyles();
    let history = useHistory()

    const handleLogout = () => {
        setAuthenticated(localStorage.setItem("jwt_token", false));
        setAuthenticated(false);
        setOpen();
        history.push('/')
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