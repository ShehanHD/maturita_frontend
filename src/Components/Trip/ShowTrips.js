import React, { useEffect, useState } from 'react'
import { URL } from '../Shared/api_url';
import { Modal, Fade, Backdrop, Button } from '@material-ui/core';
import { useStyles } from '../Shared/useStyles';
import { Link } from 'react-router-dom';
import TripFilter from './TripFilter'


const ShowTrips = () => {
    const [trips, setTrips] = useState([]);

    return (
        <>
            <TripFilter setTrips={setTrips} />
            <div className="trip-main">
                {trips.length ? trips.map(item => <TripItem key={item.id} data={item} />)
                    : <> <h3 style={{ color: "white", textAlign: "center", marginBottom: "1vh" }}>Non ci sono i viaggi</h3></>}
            </div >
        </>
    )
}

export default ShowTrips

export const TripItem = ({ data }) => {
    let data_di_partenza = new Date(data.data_di_partenza);
    let data_di_arrivo = new Date((data_di_partenza.getTime() + (data.durata * 3600 * 1000)));

    return (
        <div className="trip-list">
            <div className="trip-list-head">
                <h2>{data.partenza}  <i className="fas fa-arrow-right"></i>  {data.destinazione}</h2>
                <h2><i className="far fa-calendar-alt"></i> {data_di_partenza.toLocaleDateString('it-EU')}</h2>
            </div>
            <div className="trip-list-body">

                <div className="image">
                    <img src={data.foto === "" ? "http://simpleicon.com/wp-content/uploads/car1.png" : data.foto} alt="veicolo" />
                </div>

                <div className="details">
                    <p>Partenza: {data_di_partenza.toLocaleString('it-EU')}</p>
                    <p>Arrivo: {data_di_arrivo.toLocaleString('it-EU')}</p>
                    <sub>Creato al: {data.creato_al}</sub>
                </div>

                <div className="contribute">
                    <h2>€{data.contributo}</h2>
                    <h4><i className="fas fa-user"></i> {data.numero_posti}</h4>
                </div>

            </div>
            <div className="trip-list-foot">
                <Link className="link-btn" to={'/' + data.id}>Dettagli</Link>
            </div>
        </div>
    )
}