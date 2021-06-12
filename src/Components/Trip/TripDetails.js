import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { URL } from '../Shared/api_url';

const TripDetails = () => {
    let { trip_id } = useParams();
    const [tripDetail, setTripDetail] = useState([])
    const [feedback, setFeedback] = useState([])
    const [feedbackMsg, setFeedbackMsg] = useState("Deve fare il Login prima di visualizzare i contenuti")
    const [dMsg, setDMsg] = useState("Loading....")
    const [authenticated, setAuthenticated] = useState("");

    useEffect(() => {
        getDetails();
        setAuthenticated(localStorage.getItem("jwt_token"))
    }, [])

    useEffect(() => {
        tripDetail.length !== 0 && getFeedback();
    }, [tripDetail])

    const getDetails = () => {
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
                setDMsg("Qualcosa è andato storto!");
            })
    }

    const getFeedback = () => {
        let id_autista = tripDetail.id_autista;

        fetch(`${URL}/feedback/by_passenger/${id_autista}`, {
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${authenticated}`
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
                    setFeedback(data.body)
                }
                else {
                    console.error(data.message);
                    //dispatch(callNotification(data.message, "warning"));
                }
            })
            .catch(err => {
                if (err.status === 401) {
                    setFeedbackMsg("Deve fare il Login prima di visualizzare i contenuti")
                }
            })
    }

    return (
        <div className="trip-detail">
            {/* Trip detail */}
            <h1 className="trip-detail-title">Details</h1>
            <div className="details">
                {tripDetail.length !== 0 ? <Details tripDetail={tripDetail} /> : <h2>{dMsg}</h2>}
            </div>

            <h1 className="trip-detail-title">Feedback</h1>
            {/* Feedback al autista se fatto il login */}
            <>
                {feedback.length !== 0
                    ? feedback.map(item => <Feedback key={item.id} feedbackDetail={item} />)
                    : <div className="feedback"><h2>{feedbackMsg}</h2></div>}
            </>
        </div>
    )
}

export default TripDetails

export const Details = ({ tripDetail }) => {
    return (
        <>
            <div className="details-head">
                <h2>{tripDetail.partenza}  <i className="fas fa-arrow-right"></i>  {tripDetail.destinazione}</h2>
                <h2>€{tripDetail.contributo}</h2>
            </div>
            <div className="details-body">
                <div className="details-body-left">
                    <h3>{tripDetail.marca} {tripDetail.modello}</h3>
                    <img src={tripDetail.foto === "" ? "http://simpleicon.com/wp-content/uploads/car1.png" : tripDetail.foto} alt="veicolo" />
                    <h3>{tripDetail.targa}</h3>
                </div>

                <div className="details-body-right">
                    <p><b>Trip ID: </b>{tripDetail.id}</p>
                    <p><b>Partenza da: </b>{tripDetail.partenza}</p>
                    <p><b>Destinazione a: </b>{tripDetail.destinazione}</p>
                    <p><b>Data di partenza: </b>{tripDetail.data_di_partenza}</p>
                    <p><b><i className="far fa-clock"></i></b> {tripDetail.durata} ore</p>
                    <p><b><i className="fas fa-paw"></i></b> {tripDetail.animali ? "SI" : "NO"}</p>
                    <p><b><i className="fas fa-suitcase"></i></b> {tripDetail.bagagli ? "SI" : "NO"}</p>
                    <p><b><i className="fas fa-ban"></i></b> {tripDetail.soste}</p>
                    <p><b><i className="fas fa-user"></i></b> {tripDetail.soste}</p>
                </div>
            </div>
            <div className="details-foot">
                <b>{tripDetail.nome} {tripDetail.cognome}</b>
                <b><a href={"mailto:" + tripDetail.email}>{tripDetail.email}</a></b>
                <b><a href={"tel:+" + tripDetail.telefono}>{tripDetail.telefono}</a></b>
            </div>
        </>
    )
}

export const Feedback = ({ feedbackDetail }) => {
    return (
        <div className="feedback">
            <div className="details-head">
                head
            </div>
            <div className="details-body">
                body
            </div>
            <div className="details-foot">
                foot
            </div>
        </div>
    )
}
