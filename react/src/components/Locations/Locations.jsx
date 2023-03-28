import LocationsCSS from './Locations.module.css'

import * as React from 'react';
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client";
import Preload from "../Units/UI/Preload";

export default function Locations() {
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation()
  const { country } = location.state

  const getAllLocations = (id) => {
    axiosClient.get(`/locations/${id}`, {
      params: {
        id: country.id,
      }
    })
      .then(({data}) => {
        setRegions(data.location_first);
        console.log(data);
    })
      .catch((error) => {
        // ToDo: make myself alerts
        console.log(error);
      })
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getAllLocations(country.id);
  }, []);

  return (
    <div>
      {isLoading
      ?
        <Preload />
      :
        regions.length
        ?
          regions.map(region => <div key={region.name}>{region.name} {region.description}</div>)
        :
          <div className={LocationsCSS.empty_info}>No resource data</div>
      }
    </div>);
}
