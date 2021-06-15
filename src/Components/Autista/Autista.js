import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import { URL } from '../Shared/api_url';
import AddVehicle from './AddVehicle';
import CreateTrip from './CreateTrip';
import DriverData from './DriverData';

const Autista = ({ auth }) => {
    const [isDriver, setIsDriver] = useState(false)
    const [selectedTab, setSelectedTab] = useState(0);
    const [vehicles, setVehicles] = useState([])
    let history = useHistory();

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        localStorage.getItem("jwt_token") === "" && history.push('/')
        getIsDriver();
        getVehicle();
    }, [])

    const getIsDriver = () => {
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
                if (data.body) {
                    setIsDriver(data.body)
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

    const getVehicle = () => {
        let a = localStorage.getItem("jwt_token") ?? auth;

        fetch(`${URL}/trip/get_vehicles`, {
            contentType: 'application/json',
            headers: {
                'Authorization': `Bearer ${a}`
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                };
                throw "Something went wrong";
            })
            .then(data => {
                if (data.body) {
                    setVehicles(data.body)
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
            {isDriver ?
                <>
                    <Tabs
                        style={{ marginTop: "2vh" }}
                        value={selectedTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Viaggi" />
                        <Tab label="Veicoli" />
                    </Tabs>
                    <div div className="driver">
                        {selectedTab === 0 && <CreateTrip vehicles={vehicles} />}
                        {selectedTab === 1 && <AddVehicle vehicles={vehicles} setVehicles={setVehicles} />}
                    </div>
                </>
                :
                <>
                    <DriverData />
                </>
            }
        </div>
    )
}

export default Autista;
