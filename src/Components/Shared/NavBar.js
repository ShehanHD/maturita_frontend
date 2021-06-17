import React, { useEffect, useState } from 'react';
import { Modal, Fade, Backdrop, TextField, Button } from '@material-ui/core';
import { URL } from './api_url';
import sha256 from 'sha256';
import { useStyles } from './useStyles';
import { Link } from 'react-router-dom';


const NavBar = ({ handleRegistrationForm, handleLoginForm, handleLogoutForm, auth }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(localStorage.getItem("jwt_token"));
    }, [auth])


    return (
        <>
            <nav className="navbar">
                <div>
                    <h2><Link to={'/'}>weShare</Link></h2>
                    <ul className="nav-menu">
                        {
                            localStorage.getItem("jwt_token") !== "false"
                                ?
                                <>
                                    <li><Link to={'/passeggero'}>Passeggero</Link></li>
                                    <li><Link to={'/autista'}>Autista</Link></li>
                                    <li className="logout" onClick={handleLogoutForm}>Logout</li>
                                </>
                                :
                                <>
                                    <li onClick={handleRegistrationForm}>Registrazione</li>
                                    <li onClick={handleLoginForm}>Login</li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
