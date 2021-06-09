import React from 'react'
import ShowTrips from './ShowTrips'
import TripFilter from './TripFilter'

const index = () => {
    return (
        <div id="trip">
            <TripFilter />
            <ShowTrips />
        </div>
    )
}

export default index
