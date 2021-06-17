import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Passenger = () => {
    let history = useHistory()
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        localStorage.getItem("jwt_token") === "" && history.push('/')
    }, [])

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Tabs
                style={{ marginTop: "2vh" }}
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
            >
                <Tab label="Prenotazioni" />
                <Tab label="Feedback" />
            </Tabs>
            <div div className="driver">
                {selectedTab === 0 && <p>as</p>}
                {selectedTab === 1 && <p>s</p>}
            </div>
        </>
    )
}

export default Passenger
