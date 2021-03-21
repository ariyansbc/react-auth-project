import React,{useState, useEffect} from 'react';
import vehiclesData from '../fakeData/data.json'
import Vehicles from '../Vehicles/Vehicles';
import './Home.css'

const Home = () => {

    const [vehicles,setVehicles] = useState([])
    useEffect(()=>{
        setVehicles(vehiclesData);
    },[])
    console.log(vehicles);
    return (
        <div className="home-container">
            <div className="vehicles-container">
                {
                    vehicles.map(vh=> <Vehicles vehicle={vh} key={vh.id}></Vehicles> )
                }
            </div>
        </div>
    );
};

export default Home;