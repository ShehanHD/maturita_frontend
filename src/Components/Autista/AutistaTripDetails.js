import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { URL } from '../Shared/api_url';

const AutistaTripDetails = () => {
    let { trip_id } = useParams();

    useEffect(() => {
        getTripBookings();
    }, [])

    const getTripBookings = () => {
        let a = localStorage.getItem("jwt_token");

        fetch(`${URL}/reservation/all_passengers_by_trip_id/${trip_id}`, {
            contentType: 'application/json',
            headers: {
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
                    console.log(data.body)
                }
                else {
                    console.error(data.message);
                    //dispatch(callNotification(data.message, "warning"));
                }
            })
            .catch(err => {
                if (err.status === 401) {
                    console.log("Deve fare il Login prima di visualizzare i contenuti")
                }
            })
    }

    return (
        <div>
            {trip_id}
        </div>
    )
}

export default AutistaTripDetails
