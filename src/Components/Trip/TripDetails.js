import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../Shared/api_url';

const TripDetails = () => {
    let { trip_id } = useParams();
    const [tripDetail, setTripDetail] = useState([])

    useEffect(() => {
        fetch(`${URL}/trip/by_id/${trip_id}`)
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw response;
            })
            .then(data => {
                if (data.body) {
                    setTripDetail(data.body[0])
                }
                else {
                    console.error(data.message);
                    //dispatch(callNotification(data.message, "warning"));
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="trip-detail">
            {/* Trip detail */}
            <h1 className="trip-detail-title">Details</h1>
            <div className="details">
                <div className="details-left">
                    <img src={tripDetail.foto === "" ? "http://simpleicon.com/wp-content/uploads/car1.png" : tripDetail.foto} alt="veicolo" />
                </div>

                <div className="details-right">
                    <p>{tripDetail.id}</p>
                </div>
            </div>

            <h1 className="trip-detail-title">Feedback</h1>
            {/* Feedback al autista se fatto il login */}
        </div>
    )
}

export default TripDetails
