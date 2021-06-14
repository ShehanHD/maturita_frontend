import React, { useEffect, useState } from 'react'
import { URL } from '../Shared/api_url';

const Autista = ({ auth }) => {
    useEffect(() => {
        isDriver();
    }, [])


    const isDriver = () => {
        let a = localStorage.getItem("jwt_token") ?? auth;
        fetch(`${URL}/trip/is_driver`, {
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${a}`
            }
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
                    console.log(data)
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
        <div>

        </div>
    )
}

export default Autista
