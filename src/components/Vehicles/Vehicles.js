import React from 'react';
import { Link } from 'react-router-dom';
import './Vehicle.css'

const Vehicles = (props) => {
    const { id, vehicle, pickFrom, pickTo, image, rent } = props.vehicle
    return (
        <Link to="/destination">
          <div className="vehicle-box">
            <img className="v-img" src={image} alt="" />
            <h2>{vehicle}</h2>
          </div>
        </Link>
    );
};

export default Vehicles;