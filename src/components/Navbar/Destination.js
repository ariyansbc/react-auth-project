import React from 'react';
import './Destination.css'
import mapImg from '../../images/Map.png'

const Destination = () => {

    const handleSearchSubmit=(e)=>{

        e.preventDefault();

    }
    return (
        <div className="destination">
            <div className="map-container">
                <div className="map-search-area">
                    <form onSubmit={handleSearchSubmit}>
                        <p>PickFrom</p>
                        <input type="text" placeholder="mirpur 1"/>
                        <br/>
                        <p>PickTo</p>
                        <input type="text" placeholder="dhanmondi"/>
                        <br/>
                        <input type="submit" value="Search" />
                    </form>

                </div>
                <div className="map-area">
                    <img src={mapImg} alt="map" />
               </div>
            </div>
        </div>
    );
};

export default Destination;